"use client";

import React from 'react';
import { TransactionList } from './TransactionList';

export const TransactionsView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
        <p className="text-slate-500 text-sm mt-1">Review and manage your financial history</p>
      </div>
      <TransactionList />
    </div>
  );
};
