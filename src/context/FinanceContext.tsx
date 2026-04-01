
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type ViewType = 'Dashboard' | 'Transactions' | 'Analytics' | 'Cards' | 'Investments' | 'Settings';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export type UserRole = 'Admin' | 'Viewer';

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  activeView: ViewType;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setUserRole: (role: UserRole) => void;
  setActiveView: (view: ViewType) => void;
  isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-15', description: 'UPI to Ramesh', amount: 500, category: 'Food', type: 'Expense' },
  { id: '2', date: '2024-05-14', description: 'Swiggy Biryani', amount: 350, category: 'Food', type: 'Expense' },
  { id: '3', date: '2024-05-13', description: 'Jio Recharge', amount: 666, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-12', description: 'Internship Stipend', amount: 15000, category: 'Salary', type: 'Income' },
  { id: '5', date: '2024-05-11', description: 'Airtel Bill', amount: 999, category: 'Bills', type: 'Expense' },
  { id: '6', date: '2024-05-10', description: 'Zomato Pizza', amount: 450, category: 'Food', type: 'Expense' },
  { id: '7', date: '2024-05-09', description: 'Uber Ride', amount: 220, category: 'Transport', type: 'Expense' },
  { id: '8', date: '2024-05-08', description: 'Amazon Shopping', amount: 1200, category: 'Shopping', type: 'Expense' },
  { id: '9', date: '2024-05-07', description: 'Netflix Subscription', amount: 199, category: 'Entertainment', type: 'Expense' },
  { id: '10', date: '2024-05-06', description: 'Grocery Store', amount: 1500, category: 'Groceries', type: 'Expense' },
  { id: '11', date: '2024-05-05', description: 'Freelance Project', amount: 8000, category: 'Salary', type: 'Income' },
  { id: '12', date: '2024-05-04', description: 'Petrol Pump', amount: 1000, category: 'Transport', type: 'Expense' },
  { id: '13', date: '2024-05-03', description: 'Electricity Bill', amount: 2500, category: 'Bills', type: 'Expense' },
  { id: '14', date: '2024-05-02', description: 'Gym Membership', amount: 1200, category: 'Health', type: 'Expense' },
  { id: '15', date: '2024-05-01', description: 'Medicine', amount: 500, category: 'Health', type: 'Expense' },
  { id: '16', date: '2024-04-30', description: 'Movie Tickets', amount: 600, category: 'Entertainment', type: 'Expense' },
  { id: '17', date: '2024-04-29', description: 'Rent Payment', amount: 12000, category: 'Rent', type: 'Expense' },
  { id: '18', date: '2024-04-28', description: 'Dinner with Friends', amount: 2000, category: 'Food', type: 'Expense' },
  { id: '19', date: '2024-04-27', description: 'Dividends', amount: 300, category: 'Salary', type: 'Income' },
  { id: '20', date: '2024-04-26', description: 'Book Purchase', amount: 450, category: 'Education', type: 'Expense' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('zorvyn_transactions');
    const savedRole = localStorage.getItem('zorvyn_role');
    const savedView = localStorage.getItem('zorvyn_view');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedRole) {
      setUserRole(savedRole as UserRole);
    }

    if (savedView) {
      setActiveView(savedView as ViewType);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
      localStorage.setItem('zorvyn_role', userRole);
      localStorage.setItem('zorvyn_view', activeView);
    }
  }, [transactions, userRole, activeView, isLoading]);

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
      activeView, 
      addTransaction, 
      deleteTransaction, 
      setUserRole, 
      setActiveView, 
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
