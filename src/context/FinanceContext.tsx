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

const INITIAL_DATA: Record<string, Transaction[]> = {
  'yuvanshkoli1011@gmail.com': [
    { id: 'y1', date: '2024-05-20', description: 'Corporate Stipend - Zorvyn', amount: 25000, category: 'Salary', type: 'Income' },
    { id: 'y2', date: '2024-05-19', description: 'MacBook Pro EMI', amount: 8500, category: 'Electronics', type: 'Expense' },
    { id: 'y3', date: '2024-05-18', description: 'AWS Cloud Services', amount: 1200, category: 'Cloud', type: 'Expense' },
    { id: 'y4', date: '2024-05-15', description: 'Freelance UI Project', amount: 12000, category: 'Income', type: 'Income' },
    { id: 'y5', date: '2024-05-14', description: 'Starlink Monthly', amount: 3500, category: 'Utilities', type: 'Expense' },
  ],
  'aditya.rao@zorvyn.com': [
    { id: 'a1', date: '2024-05-20', description: 'University Canteen Card', amount: 2500, category: 'Food', type: 'Expense' },
    { id: 'a2', date: '2024-05-19', description: 'NPTEL Course Certification', amount: 1200, category: 'Education', type: 'Expense' },
    { id: 'a3', date: '2024-05-18', description: 'Part-time Tutoring', amount: 5000, category: 'Allowance', type: 'Income' },
    { id: 'a4', date: '2024-05-17', description: 'Kindle E-book Store', amount: 450, category: 'Education', type: 'Expense' },
    { id: 'a5', date: '2024-05-16', description: 'Gym Membership', amount: 1500, category: 'Health', type: 'Expense' },
  ],
  'priya.sharma@zorvyn.com': [
    { id: 'p1', date: '2024-05-20', description: 'Behance Portfolio Premium', amount: 1500, category: 'Subscription', type: 'Expense' },
    { id: 'p2', date: '2024-05-19', description: 'Commission: NFT Artwork', amount: 18000, category: 'Freelance', type: 'Income' },
    { id: 'p3', date: '2024-05-18', description: 'Adobe Creative Cloud', amount: 2400, category: 'Subscription', type: 'Expense' },
    { id: 'p4', date: '2024-05-16', description: 'Uber Rides (Co-working)', amount: 1200, category: 'Transport', type: 'Expense' },
    { id: 'p5', date: '2024-05-15', description: 'Wacom Pen Nibs', amount: 800, category: 'Supplies', type: 'Expense' },
  ]
};

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

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('zorvyn_current_user');
    const savedTheme = localStorage.getItem('zorvyn_theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(user.role);
      
      const userTransactions = localStorage.getItem(`zorvyn_tx_${user.email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      } else {
        setTransactions(INITIAL_DATA[user.email] || []);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && currentUser) {
      localStorage.setItem(`zorvyn_tx_${currentUser.email}`, JSON.stringify(transactions));
      localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('zorvyn_current_user', JSON.stringify(currentUser));

      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [transactions, currentUser, isLoading, isDarkMode]);

  const login = (email: string, password?: string) => {
    const user = DEMO_ACCOUNTS.find(acc => acc.email === email);
    if (user || password === 'zorvyn2024') {
      const sessionUser = user || { name: 'Guest User', email, role: 'Viewer' as UserRole };
      setCurrentUser(sessionUser);
      setUserRole(sessionUser.role);
      
      const userTransactions = localStorage.getItem(`zorvyn_tx_${sessionUser.email}`);
      if (userTransactions) {
        setTransactions(JSON.parse(userTransactions));
      } else {
        setTransactions(INITIAL_DATA[sessionUser.email] || []);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('zorvyn_current_user');
    setTransactions([]);
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