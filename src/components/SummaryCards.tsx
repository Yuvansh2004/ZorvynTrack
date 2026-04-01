
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      trend: '+12.5%',
      isPositive: true
    },
    {
      title: 'Total Income',
      amount: income,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      trend: '+8.2%',
      isPositive: true
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      icon: TrendingDown,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/20',
      trend: '+2.4%',
      isPositive: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`glass-card p-5 rounded-2xl border ${card.border} group min-h-[160px] flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 ${card.bg} rounded-xl group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${card.isPositive ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
              {card.isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
              {card.trend}
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 truncate">{card.title}</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight truncate leading-none">
              {formatINR(card.amount)}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
