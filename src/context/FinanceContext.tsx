
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

// Fixed base timestamp for January 1st, 2026
const BASE_TIME = 1767225600000; 

const INITIAL_DATA: Transaction[] = [
  { id: '1', date: '2026-01-01', description: 'Joining Stipend Bonus', amount: 10000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '2', date: '2026-01-02', description: 'Metro Card Auto-Topup', amount: 500, category: 'Transport', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '3', date: '2026-01-04', description: 'Cafe Coffee Day (Study Session)', amount: 350, category: 'Food', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '4', date: '2026-01-05', description: 'Amazon Prime Yearly', amount: 1499, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '5', date: '2026-01-08', description: 'Primary Monthly Stipend', amount: 25000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '6', date: '2026-01-10', description: 'BookMyShow - Interstellar Re-run', amount: 800, category: 'Entertainment', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '7', date: '2026-01-12', description: 'Zomato Office Dinner', amount: 650, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '8', date: '2026-01-15', description: 'Electricity Bill Payment', amount: 1200, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '9', date: '2026-01-18', description: 'Freelance Logo Design', amount: 5000, category: 'Income', type: 'Income', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '10', date: '2026-01-20', description: 'Postpaid Mobile Bill', amount: 599, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '11', date: '2026-01-22', description: 'Uber Premier to Client', amount: 250, category: 'Transport', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '12', date: '2026-01-24', description: 'Cult.fit Membership Renewal', amount: 2000, category: 'Health', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '13', date: '2026-01-26', description: 'Republic Day Celebration', amount: 1500, category: 'Leisure', type: 'Expense', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '14', date: '2026-01-28', description: 'BigBasket Grocery Load', amount: 3000, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '15', date: '2026-01-30', description: 'Investment Dividend', amount: 2000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '16', date: '2026-02-01', description: 'February Monthly Stipend', amount: 25000, category: 'Income', type: 'Income', ownerEmail: 'yuvanshkoli@demozorvyn.com', createdAt: BASE_TIME },
  { id: '17', date: '2026-02-02', description: 'Laptop Upgrade EMI', amount: 500, category: 'Electronics', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '18', date: '2026-02-04', description: 'Swiggy Gourmet Lunch', amount: 450, category: 'Food', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
  { id: '19', date: '2026-02-06', description: 'Fiber Internet Bill', amount: 799, category: 'Utilities', type: 'Expense', ownerEmail: 'aditya.rao@zorvyn.com', createdAt: BASE_TIME },
  { id: '20', date: '2026-02-08', description: 'Pharmacy - Vitamins', amount: 450, category: 'Health', type: 'Expense', ownerEmail: 'priya.sharma@zorvyn.com', createdAt: BASE_TIME },
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
  isTransitioning: boolean;
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
  const [isTransitioning, setIsTransitioning] = useState(false);
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

    // Initial system boot loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    const duration = Math.floor(Math.random() * 4000) + 1000; // 1 to 5 seconds
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, duration);
  };

  const login = (email: string, password?: string) => {
    const user = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
    if (user || password === 'zorvyn2024') {
      const sessionUser = user || { name: 'Guest User', email, role: 'Viewer' as UserRole };
      triggerTransition(() => {
        setCurrentUser(sessionUser);
        setUserRole(sessionUser.role);
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    triggerTransition(() => {
      setCurrentUser(null);
      setActiveView('Dashboard');
    });
  };

  const handleSetActiveView = (view: ViewType) => {
    if (view === activeView) return;
    triggerTransition(() => {
      setActiveView(view);
    });
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
      setActiveView: handleSetActiveView,
      addTransaction, 
      updateTransaction,
      deleteTransaction, 
      resetLedger,
      isLoading,
      isTransitioning,
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
