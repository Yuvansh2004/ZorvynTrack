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
  ownerEmail: string; // Tracks who the transaction belongs to
}

export const DEMO_ACCOUNTS: User[] = [
  { name: 'Yuvansh Dashrath Koli', email: 'yuvanshkoli@demozorvyn.com', role: 'Admin' },
  { name: 'Aditya Rao', email: 'aditya.rao@zorvyn.com', role: 'Viewer' },
  { name: 'Priya Sharma', email: 'priya.sharma@zorvyn.com', role: 'Viewer' },
];

const INITIAL_DATA: Transaction[] = [
  { id: 'y1', date: '2024-05-20', description: 'Corporate Stipend - Zorvyn', amount: 25000, category: 'Salary', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'y2', date: '2024-05-19', description: 'MacBook Pro EMI', amount: 8500, category: 'Electronics', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com' },
  { id: 'a1', date: '2024-05-20', description: 'University Canteen Card', amount: 2500, category: 'Food', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'a2', date: '2024-05-19', description: 'NPTEL Course Certification', amount: 1200, category: 'Education', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com' },
  { id: 'p1', date: '2024-05-20', description: 'Behance Portfolio Premium', amount: 1500, category: 'Subscription', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com' },
  { id: 'p2', date: '2024-05-19', description: 'Commission: NFT Artwork', amount: 18000, category: 'Freelance', type: 'Income', ownerEmail: 'priya.sharma@zorvyn.com' },
];

interface FinanceContextType {
  transactions: Transaction[]; // Visible transactions based on role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'ownerEmail'>) => void;
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

  // Load initial data from localStorage or fallback to constants
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

  // Save changes to localStorage whenever masterLedger, user, or theme changes
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

  // Derived state: Filter transactions based on current role
  // Admin sees EVERYTHING. Viewer sees ONLY their OWN data.
  const transactions = masterLedger.filter(t => {
    if (userRole === 'Admin') return true;
    return currentUser ? t.ownerEmail === currentUser.email : false;
  });

  const login = (email: string, password?: string) => {
    const user = DEMO_ACCOUNTS.find(acc => acc.email === email);
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
      ownerEmail: currentUser.email // Mark as belonging to the current user
    };
    setMasterLedger(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    // Only Admin can delete records as per assignment requirement
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