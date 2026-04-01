"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type UserRole = 'Admin' | 'Viewer';
export type ViewType = 'Dashboard' | 'Transactions' | 'Insights' | 'Settings';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const DEMO_ACCOUNTS: User[] = [
  { name: 'Yuvansh Dashrath Koli', email: 'yuvanshkoli1011@gmail.com', role: 'Admin' },
  { name: 'Aditya Rao', email: 'aditya.rao@zorvyn.com', role: 'Viewer' },
  { name: 'Priya Sharma', email: 'priya.sharma@zorvyn.com', role: 'Viewer' },
];

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
  currentUser: User | null;
  login: (email: string, password?: string) => boolean;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('zorvyn_transactions');
    const savedUser = localStorage.getItem('zorvyn_current_user');
    const savedTheme = localStorage.getItem('zorvyn_theme');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(user.role);
    }

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
      localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
      
      if (currentUser) {
        localStorage.setItem('zorvyn_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('zorvyn_current_user');
      }

      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [transactions, currentUser, isLoading, isDarkMode]);

  const login = (email: string, password?: string) => {
    // For student assignment, we simulate auth with a master key or demo account match
    const user = DEMO_ACCOUNTS.find(acc => acc.email === email);
    if (user || password === 'zorvyn2024') {
      const sessionUser = user || { name: 'External Auditor', email, role: 'Viewer' as UserRole };
      setCurrentUser(sessionUser);
      setUserRole(sessionUser.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('zorvyn_current_user');
    setActiveView('Dashboard');
  };

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
      login,
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