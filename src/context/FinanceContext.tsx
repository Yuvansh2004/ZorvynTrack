"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type UserRole = 'Admin' | 'Viewer';
export type ViewType = 'Dashboard' | 'Transactions' | 'Insights' | 'Settings';

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
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-20', description: 'UPI to Ramesh (Lunch)', amount: 450, category: 'Food', type: 'Expense' },
  { id: '2', date: '2024-05-19', description: 'Internship Stipend', amount: 15000, category: 'Salary', type: 'Income' },
  { id: '3', date: '2024-05-18', description: 'Jio Recharge', amount: 749, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-17', description: 'Swiggy Biryani', amount: 320, category: 'Food', type: 'Expense' },
  { id: '5', date: '2024-05-16', description: 'Airtel Broadband', amount: 1180, category: 'Bills', type: 'Expense' },
  { id: '6', date: '2024-05-15', description: 'Freelance Design Work', amount: 5000, category: 'Salary', type: 'Income' },
  { id: '7', date: '2024-05-14', description: 'Amazon - Laptop Bag', amount: 1200, category: 'Shopping', type: 'Expense' },
  { id: '8', date: '2024-05-13', description: 'Petrol - HP Pump', amount: 500, category: 'Transport', type: 'Expense' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assumption: I used local state for the Role-Based UI to demonstrate frontend logic 
    // without needing a complex Auth provider for this internship assignment.
    const savedTransactions = localStorage.getItem('zorvyn_transactions');
    const savedRole = localStorage.getItem('zorvyn_role');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedRole) {
      setUserRole(savedRole as UserRole);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
      localStorage.setItem('zorvyn_role', userRole);
    }
  }, [transactions, userRole, isLoading]);

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
      activeView,
      setActiveView,
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
