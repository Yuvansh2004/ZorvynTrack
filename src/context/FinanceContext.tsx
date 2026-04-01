
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

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  ownerEmail: string;
  createdAt: number;
}

// Fixed base timestamp for March 1st, 2026 to prevent hydration mismatches
const BASE_TIME = 1772409600000; 

const INITIAL_DATA: Transaction[] = [
  // 20 Unique Indian-Context Transactions for 2026
  { id: '1', date: '2026-03-01', description: 'Internship Stipend', amount: 35000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '2', date: '2026-03-02', description: 'UPI to Ramesh (Canteen)', amount: 120, category: 'Food', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '3', date: '2026-03-03', description: 'Swiggy Biryani Order', amount: 450, category: 'Food', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '4', date: '2026-03-04', description: 'Jio 5G Recharge', amount: 749, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '5', date: '2026-03-05', description: 'Airtel Broadband Bill', amount: 999, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '6', date: '2026-03-06', description: 'Laptop Monthly Installment', amount: 8500, category: 'Electronics', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '7', date: '2026-03-07', description: 'Zomato Dinner with Friends', amount: 1200, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '8', date: '2026-03-08', description: 'Amazon Coding Books', amount: 2400, category: 'Education', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '9', date: '2026-03-10', description: 'Freelance UI Design Project', amount: 15000, category: 'Income', type: 'Income', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '10', date: '2026-03-12', description: 'Cult.fit Gym Membership', amount: 3000, category: 'Health', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '11', date: '2026-03-14', description: 'Netflix Premium Plan', amount: 649, category: 'Entertainment', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '12', date: '2026-03-15', description: 'Uber to University', amount: 350, category: 'Transport', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '13', date: '2026-03-16', description: 'Monthly Bus Pass (BEST)', amount: 600, category: 'Transport', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '14', date: '2026-03-17', description: 'Engineering Graphics Supplies', amount: 850, category: 'Education', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '15', date: '2026-03-20', description: 'Quarterly Performance Bonus', amount: 10000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '16', date: '2026-03-22', description: 'Starbucks Coffee (Meeting)', amount: 550, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '17', date: '2026-03-23', description: 'Electricity Bill', amount: 1800, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '18', date: '2026-03-24', description: 'Google One Cloud Storage', amount: 130, category: 'Tech', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '19', date: '2026-03-25', description: 'Mutual Fund Dividends', amount: 1200, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '20', date: '2026-03-28', description: 'Lonavala Weekend Trip', amount: 5000, category: 'Travel', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
];

interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'ownerEmail' | 'createdAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  resetLedger: () => void;
  isLoading: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currentUser: User | null;
  updateProfile: (name: string) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  hasSeenTutorial: boolean;
  completeTutorial: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [masterLedger, setMasterLedger] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('zorvyn_current_user');
    const savedTheme = localStorage.getItem('zorvyn_theme');
    const savedLedger = localStorage.getItem('zorvyn_master_ledger');
    const tutorialSeen = localStorage.getItem('zorvyn_tutorial_seen');
    
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

    if (tutorialSeen === 'true') {
      setHasSeenTutorial(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_master_ledger', JSON.stringify(masterLedger));
      localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('zorvyn_tutorial_seen', hasSeenTutorial.toString());
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
  }, [masterLedger, currentUser, isLoading, isDarkMode, hasSeenTutorial]);

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

  const updateProfile = (name: string) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, name });
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'ownerEmail' | 'createdAt'>) => {
    if (!currentUser) return;
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      ownerEmail: currentUser.email,
      createdAt: Date.now()
    };
    setMasterLedger(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const transaction = masterLedger.find(t => t.id === id);
    if (!transaction) return;

    const isOwner = currentUser && transaction.ownerEmail === currentUser.email;
    const isWithinWindow = (Date.now() - transaction.createdAt) < 30000;

    if (userRole === 'Admin' || (isOwner && isWithinWindow)) {
      setMasterLedger(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const deleteTransaction = (id: string) => {
    const transaction = masterLedger.find(t => t.id === id);
    if (!transaction) return;

    const isOwner = currentUser && transaction.ownerEmail === currentUser.email;
    const isWithinWindow = (Date.now() - transaction.createdAt) < 30000;

    if (userRole === 'Admin' || (isOwner && isWithinWindow)) {
      setMasterLedger(prev => prev.filter(t => t.id !== id));
    }
  };

  const resetLedger = () => {
    setMasterLedger(INITIAL_DATA);
  };

  const completeTutorial = () => {
    setHasSeenTutorial(true);
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
      resetLedger,
      isLoading,
      isDarkMode,
      setIsDarkMode,
      currentUser,
      updateProfile,
      login,
      logout,
      hasSeenTutorial,
      completeTutorial
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
