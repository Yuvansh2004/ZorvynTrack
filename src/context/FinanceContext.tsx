"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type UserRole = 'Admin' | 'Viewer';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-15', description: 'Grocery Shopping', amount: 2500, category: 'Food', type: 'Expense' },
  { id: '2', date: '2024-05-14', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'Income' },
  { id: '3', date: '2024-05-13', description: 'Internet Bill', amount: 1200, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-12', description: 'Freelance Project', amount: 15000, category: 'Salary', type: 'Income' },
  { id: '5', date: '2024-05-11', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'Expense' },
  { id: '6', date: '2024-05-10', description: 'Gas Station', amount: 3000, category: 'Transport', type: 'Expense' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assumption: I used local state for the Role-Based UI to demonstrate frontend logic 
    // without needing a complex Auth provider for this assignment.
    const savedTransactions = localStorage.getItem('zorvyn_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      userRole, 
      setUserRole,
      addTransaction, 
      deleteTransaction, 
      isLoading 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
};