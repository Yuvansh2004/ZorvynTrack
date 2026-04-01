"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type UserRole = 'Admin' | 'Viewer';
export type ViewType = 'Dashboard' | 'Transactions' | 'Insights' | 'Settings';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  personalEmail?: string;
  avatar?: string;
}

export const ASSIGNMENT_REF_ID = "TE85LMG1";

export const DEMO_ACCOUNTS: User[] = [
  { 
    name: 'Yuvansh Dashrath Koli', 
    email: 'yuvanshkoli@demozorvyn.com', 
    personalEmail: 'yuvanshkoli1011@gmail.com',
    password: 'admin_zorvyn',
    role: 'Admin' 
  },
  { 
    name: 'Aditya Rao', 
    email: 'aditya.rao@zorvyn.com', 
    password: 'viewer_rao',
    role: 'Viewer' 
  },
  { 
    name: 'Priya Sharma', 
    email: 'priya.sharma@zorvyn.com', 
    password: 'viewer_sharma',
    role: 'Viewer' 
  },
];

const INITIAL_DATA: Transaction[] = [
  // Yuvansh (Admin) Data
  { id: 'y1', date: '2024-05-20', description: 'Monthly Internship Stipend', amount: 25000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y2', date: '2024-05-19', description: 'Laptop Monthly Installment', amount: 8500, category: 'Electronics', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y3', date: '2024-05-18', description: 'Grocery Shopping', amount: 3200, category: 'Food', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y4', date: '2024-05-15', description: 'Zomato Food Order', amount: 450, category: 'Food', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y5', date: '2024-05-12', description: 'Amazon Kindle Book', amount: 299, category: 'Education', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y6', date: '2024-05-10', description: 'Fuel Refill', amount: 1200, category: 'Transport', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },

  // Aditya (Viewer) Data
  { id: 'a1', date: '2024-05-22', description: 'University Course Fee', amount: 5000, category: 'Education', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a2', date: '2024-05-21', description: 'Coding Competition Prize', amount: 2000, category: 'Income', type: 'Income', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a3', date: '2024-05-19', description: 'Cafeteria Expenses', amount: 1500, category: 'Food', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a4', date: '2024-05-17', description: 'Mobile Recharge', amount: 799, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a5', date: '2024-05-14', description: 'Uber Trip', amount: 320, category: 'Transport', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a6', date: '2024-05-10', description: 'Netflix Subscription', amount: 499, category: 'Entertainment', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },

  // Priya (Viewer) Data
  { id: 'p1', date: '2024-05-20', description: 'Freelance Design Project', amount: 12000, category: 'Freelance', type: 'Income', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p2', date: '2024-05-19', description: 'Adobe Creative Cloud', amount: 2100, category: 'Subscription', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p3', date: '2024-05-18', description: 'Starbucks Coffee', amount: 450, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p4', date: '2024-05-15', description: 'Gym Membership', amount: 2000, category: 'Health', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p5', date: '2024-05-10', description: 'Art Supplies Purchase', amount: 3500, category: 'Hobby', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p6', date: '2024-05-24', description: 'Portfolio Website Hosting', amount: 1200, category: 'Tech', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  ownerEmail: string;
}

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'ownerEmail'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
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
  const [masterLedger, setMasterLedger] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('zorvyn_current_user');
    const savedTheme = localStorage.getItem('zorvyn_theme');
    const savedLedger = localStorage.getItem('zorvyn_master_ledger');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }

    if (savedLedger) {
      setMasterLedger(JSON.parse(savedLedger));
    } else {
      setMasterLedger(INITIAL_DATA);
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(user.role);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_master_ledger', JSON.stringify(masterLedger));
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
  }, [masterLedger, currentUser, isLoading, isDarkMode]);

  const transactions = masterLedger.filter(t => {
    if (userRole === 'Admin') return true;
    return currentUser ? t.ownerEmail === currentUser.email : false;
  });

  const login = (email: string, password?: string) => {
    const user = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
    if (user || password === 'zorvyn2024') {
      const sessionUser = user || { name: 'Guest User', email, role: 'Viewer' as UserRole };
      setCurrentUser(sessionUser);
      setUserRole(sessionUser.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('Dashboard');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'ownerEmail'>) => {
    if (!currentUser) return;
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      ownerEmail: currentUser.email 
    };
    setMasterLedger(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    if (userRole !== 'Admin') return;
    setMasterLedger(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    if (userRole !== 'Admin') return;
    setMasterLedger(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      userRole, 
      setUserRole,
      activeView,
      setActiveView,
      addTransaction, 
      updateTransaction,
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
