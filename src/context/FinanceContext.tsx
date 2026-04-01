
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'Income' | 'Expense';
export type ViewType = 'Dashboard' | 'Transactions' | 'Analytics' | 'Cards' | 'Investments' | 'Settings';
export type UserRole = 'Admin' | 'Viewer';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// 15 Enterprise Accounts for Assessment
export const DEMO_ACCOUNTS: User[] = [
  { email: 'admin.alpha@zorvyn.com', name: 'James Wilson', role: 'Admin' },
  { email: 'admin.beta@zorvyn.com', name: 'Sarah Jenkins', role: 'Admin' },
  { email: 'yuvansh.k@zorvyn.com', name: 'Yuvansh Koli', role: 'Admin' },
  { email: 'lead.dev@zorvyn.com', name: 'Michael Ross', role: 'Admin' },
  { email: 'ceo.zorvyn@zorvyn.com', name: 'Harvey Specter', role: 'Admin' },
  { email: 'cto.zorvyn@zorvyn.com', name: 'Jessica Pearson', role: 'Admin' },
  { email: 'viewer.one@zorvyn.com', name: 'Robert Quinn', role: 'Viewer' },
  { email: 'viewer.two@zorvyn.com', name: 'Louis Litt', role: 'Viewer' },
  { email: 'analyst.global@zorvyn.com', name: 'Rachel Zane', role: 'Viewer' },
  { email: 'risk.officer@zorvyn.com', name: 'Donna Paulsen', role: 'Viewer' },
  { email: 'audit.internal@zorvyn.com', name: 'Katrina Bennett', role: 'Viewer' },
  { email: 'compliance.node@zorvyn.com', name: 'Alex Williams', role: 'Viewer' },
  { email: 'external.node@zorvyn.com', name: 'Samantha Wheeler', role: 'Viewer' },
  { email: 'hr.admin@zorvyn.com', name: 'Gretchen Bodinski', role: 'Viewer' },
  { email: 'guest.access@zorvyn.com', name: 'Travis Tanner', role: 'Viewer' },
];

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  activeView: ViewType;
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setUserRole: (role: UserRole) => void;
  setActiveView: (view: ViewType) => void;
  isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-15', description: 'Cloud Infra Payment', amount: 45000, category: 'Technology', type: 'Expense' },
  { id: '2', date: '2024-05-14', description: 'Enterprise Subscription', amount: 125000, category: 'Software', type: 'Income' },
  { id: '3', date: '2024-05-13', description: 'API Hub Access', amount: 12000, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-12', description: 'Asset Liquidation', amount: 500000, category: 'Capital', type: 'Income' },
  { id: '5', date: '2024-05-11', description: 'Cyber Security Audit', amount: 25000, category: 'Services', type: 'Expense' },
  { id: '6', date: '2024-05-10', description: 'UPI Node Ramesh', amount: 500, category: 'Personal', type: 'Expense' },
  { id: '7', date: '2024-05-09', description: 'Swiggy Biryani Bulk', amount: 3500, category: 'Catering', type: 'Expense' },
  { id: '8', date: '2024-05-08', description: 'Jio Business Link', amount: 6660, category: 'Bills', type: 'Expense' },
  { id: '9', date: '2024-05-07', description: 'Internship Stipend Pool', amount: 150000, category: 'Payroll', type: 'Expense' },
  { id: '10', date: '2024-05-06', description: 'Dividends (Asia)', amount: 85000, category: 'Investments', type: 'Income' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('zorvyn_global_ledger');
    const savedAuth = localStorage.getItem('zorvyn_session_v2');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
    }

    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsLoggedIn(true);
      setUser(authData);
      setUserRole(authData.role);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Global synchronization via LocalStorage
      localStorage.setItem('zorvyn_global_ledger', JSON.stringify(transactions));
      if (isLoggedIn && user) {
        localStorage.setItem('zorvyn_session_v2', JSON.stringify(user));
      } else {
        localStorage.removeItem('zorvyn_session_v2');
      }
    }
  }, [transactions, isLoggedIn, user, isLoading]);

  const login = (email: string, password: string) => {
    const foundUser = DEMO_ACCOUNTS.find(acc => acc.email === email.toLowerCase());
    if (foundUser && password.length >= 4) {
      setIsLoggedIn(true);
      setUser(foundUser);
      setUserRole(foundUser.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveView('Dashboard');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    // Sync state locally (Persistence handled by useEffect)
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
      isLoggedIn,
      user,
      login,
      logout,
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
