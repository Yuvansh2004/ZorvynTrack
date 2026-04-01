"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const SummaryCards = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const data = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-indigo-600' },
    { title: 'Total Income', amount: income, icon: ArrowUpCircle, color: 'text-emerald-600' },
    { title: 'Total Expenses', amount: expenses, icon: ArrowDownCircle, color: 'text-rose-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item) => (
        <Card key={item.title} className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">{item.title}</span>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {formatINR(item.amount)}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};