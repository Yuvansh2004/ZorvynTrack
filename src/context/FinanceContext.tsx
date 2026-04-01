
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

// 15 Enterprise Accounts with Indian Identities & Corporate Domain
export const DEMO_ACCOUNTS: User[] = [
  { email: 'yuvanshkoli@zorvyn.com', name: 'Yuvansh Dashrath Koli', role: 'Admin' },
  { email: 'priya.sharma@zorvyn.com', name: 'Priya Sharma', role: 'Admin' },
  { email: 'arjun.mehta@zorvyn.com', name: 'Arjun Mehta', role: 'Admin' },
  { email: 'ananya.iyer@zorvyn.com', name: 'Ananya Iyer', role: 'Admin' },
  { email: 'rohan.gupta@zorvyn.com', name: 'Rohan Gupta', role: 'Admin' },
  { email: 'deepa.nair@zorvyn.com', name: 'Deepa Nair', role: 'Viewer' },
  { email: 'vikram.singh@zorvyn.com', name: 'Vikram Singh', role: 'Viewer' },
  { email: 'sneha.reddy@zorvyn.com', name: 'Sneha Reddy', role: 'Viewer' },
  { email: 'kabir.khan@zorvyn.com', name: 'Kabir Khan', role: 'Viewer' },
  { email: 'meera.joshi@zorvyn.com', name: 'Meera Joshi', role: 'Viewer' },
  { email: 'rahul.verma@zorvyn.com', name: 'Rahul Verma', role: 'Viewer' },
  { email: 'pooja.malhotra@zorvyn.com', name: 'Pooja Malhotra', role: 'Viewer' },
  { email: 'aditya.rao@zorvyn.com', name: 'Aditya Rao', role: 'Viewer' },
  { email: 'ishani.das@zorvyn.com', name: 'Ishani Das', role: 'Viewer' },
  { email: 'zoya.ahmed@zorvyn.com', name: 'Zoya Ahmed', role: 'Viewer' },
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
  { id: '1', date: '2024-05-15', description: 'UPI to Ramesh (Canteen)', amount: 450, category: 'Food', type: 'Expense' },
  { id: '2', date: '2024-05-14', description: 'Internship Stipend Pool', amount: 125000, category: 'Payroll', type: 'Income' },
  { id: '3', date: '2024-05-13', description: 'Jio Business Link', amount: 6660, category: 'Bills', type: 'Expense' },
  { id: '4', date: '2024-05-12', description: 'Airtel Postpaid Office', amount: 1200, category: 'Bills', type: 'Expense' },
  { id: '5', date: '2024-05-11', description: 'Swiggy Biryani Bulk', amount: 3500, category: 'Food', type: 'Expense' },
  { id: '6', date: '2024-05-10', description: 'Amazon AWS Cloud Node', amount: 15000, category: 'Technology', type: 'Expense' },
  { id: '7', date: '2024-05-09', description: 'Dividends (NIFTY 50)', amount: 85000, category: 'Investments', type: 'Income' },
  { id: '8', date: '2024-05-08', description: 'Zomato Team Lunch', amount: 4200, category: 'Food', type: 'Expense' },
  { id: '9', date: '2024-05-07', description: 'Tata Power Electricity', amount: 22000, category: 'Bills', type: 'Expense' },
  { id: '10', date: '2024-05-06', description: 'Consulting Fee (Client X)', amount: 300000, category: 'Payroll', type: 'Income' },
  { id: '11', date: '2024-05-05', description: 'HDFC Home Loan EMI', amount: 45000, category: 'Housing', type: 'Expense' },
  { id: '12', date: '2024-05-04', description: 'Uber Work Commute', amount: 850, category: 'Transport', type: 'Expense' },
  { id: '13', date: '2024-05-03', description: 'Reliance Retail Supply', amount: 55000, category: 'Bills', type: 'Expense' },
  { id: '14', date: '2024-05-02', description: 'Fixed Deposit Interest', amount: 12500, category: 'Savings', type: 'Income' },
  { id: '15', date: '2024-05-01', description: 'Office Stationary (Vikas)', amount: 2500, category: 'Bills', type: 'Expense' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('zorvyn_global_ledger_v3');
    const savedAuth = localStorage.getItem('zorvyn_session_v3');
    
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
      localStorage.setItem('zorvyn_global_ledger_v3', JSON.stringify(transactions));
      if (isLoggedIn && user) {
        localStorage.setItem('zorvyn_session_v3', JSON.stringify(user));
      } else {
        localStorage.removeItem('zorvyn_session_v3');
      }
    }
  }, [transactions, isLoggedIn, user, isLoading]);

  const login = (email: string, password: string) => {
    const foundUser = DEMO_ACCOUNTS.find(acc => acc.email === email.toLowerCase());
    if (foundUser && password === 'zorvyn2024') {
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
