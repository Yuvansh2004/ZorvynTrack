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
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currentUser: { name: string; email: string };
  logout: () => void;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-20', description: 'UPI to Ramesh (Lunch)', amount: 450, category: 'Food', type: 'Expense' },
  { id: '2', date: '2024-05-19', description: 'Internship Stipend', amount: 15000, category: 'Salary', type: 'Income' },
  { id: '3', date: '2024-05-18', description: 'Jio Recharge', amount: 749, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-17', description: 'Swiggy Biryani', amount: 320, category: 'Food', type: 'Expense' },
  { id: '5', date: '2024-05-16', description: 'Airtel Broadband', amount: 1180, category: 'Bills', type: 'Expense' },
  { id: '6', date: '2024-05-15', description: 'Freelance Work', amount: 5000, category: 'Income', type: 'Income' },
  { id: '7', date: '2024-05-14', description: 'Amazon - Laptop Bag', amount: 1200, category: 'Shopping', type: 'Expense' },
  { id: '8', date: '2024-05-13', description: 'Petrol - HP Pump', amount: 500, category: 'Transport', type: 'Expense' },
  { id: '9', date: '2024-05-12', description: 'Bank Refund', amount: 1200, category: 'Refund', type: 'Income' },
  { id: '10', date: '2024-05-11', description: 'Zomato Dinner', amount: 890, category: 'Food', type: 'Expense' },
];

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentUser = { 
    name: 'Yuvansh Dashrath Koli', 
    email: 'yuvanshkoli1011@gmail.com' 
  };

  useEffect(() => {
    const savedTransactions = localStorage.getItem('zorvyn_transactions');
    const savedRole = localStorage.getItem('zorvyn_role');
    const savedTheme = localStorage.getItem('zorvyn_theme');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedRole) {
      setUserRole(savedRole as UserRole);
    }

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
      localStorage.setItem('zorvyn_role', userRole);
      localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [transactions, userRole, isLoading, isDarkMode]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    if (userRole !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const logout = () => {
    window.location.reload();
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
      isLoading,
      isDarkMode,
      setIsDarkMode,
      currentUser,
      logout
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