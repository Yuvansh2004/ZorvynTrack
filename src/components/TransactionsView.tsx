"use client";

import React from 'react';
import { TransactionList } from './TransactionList';

export const TransactionsView = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Ledger Terminal</h1>
        <p className="text-slate-500 text-sm mt-1">Audit and manage all localized transactions</p>
      </div>
      <TransactionList />
    </div>
  );
};
