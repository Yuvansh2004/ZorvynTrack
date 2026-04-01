"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AddTransactionModal } from './AddTransactionModal';

export const TransactionList = () => {
  const { transactions, userRole, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="card-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search category..." 
              className="pl-9 w-[200px] sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {userRole === 'Admin' && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-sm border-b border-slate-100">
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Description</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Amount</th>
                {userRole === 'Admin' && <th className="pb-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((t) => (
                <tr key={t.id} className="text-sm">
                  <td className="py-4 text-slate-600">{t.date}</td>
                  <td className="py-4 font-medium text-slate-900">{t.description}</td>
                  <td className="py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-4 font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                  </td>
                  {userRole === 'Admin' && (
                    <td className="py-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteTransaction(t.id)}
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 italic">
                    No data found for your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};