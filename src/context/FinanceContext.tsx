
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
  github?: string;
  linkedin?: string;
  avatar?: string;
}

export const ASSIGNMENT_REF_ID = "TE85LMG1";

export const DEMO_ACCOUNTS: User[] = [
  { 
    name: 'Yuvansh Dashrath Koli', 
    email: 'Admin@DemoZorvynTrack.io', 
    password: 'admin_zorvyn', 
    role: 'Admin',
    personalEmail: 'yuvanshkoli1011@gmail.com',
    github: 'https://github.com/yuvanshkoli',
    linkedin: 'https://linkedin.com/in/yuvanshkoli'
  },
  { name: 'Aditya Rao', email: 'aditya.rao@DemoZorvynTrack.io', password: 'viewer_rao', role: 'Viewer' },
  { name: 'Priya Sharma', email: 'priya.sharma@DemoZorvynTrack.io', password: 'viewer_sharma', role: 'Viewer' },
  { name: 'Rohan Mehta', email: 'rohan.mehta@DemoZorvynTrack.io', password: 'viewer_mehta', role: 'Viewer' },
  { name: 'Sneha Kapoor', email: 'sneha.kapoor@DemoZorvynTrack.io', password: 'viewer_kapoor', role: 'Viewer' },
  { name: 'Vikram Singh', email: 'vikram.singh@DemoZorvynTrack.io', password: 'viewer_singh', role: 'Viewer' },
  { name: 'Ananya Iyer', email: 'ananya.iyer@DemoZorvynTrack.io', password: 'viewer_iyer', role: 'Viewer' },
  { name: 'Arjun Verma', email: 'arjun.verma@DemoZorvynTrack.io', password: 'viewer_verma', role: 'Viewer' },
  { name: 'Ishita Gupta', email: 'ishita.gupta@DemoZorvynTrack.io', password: 'viewer_gupta', role: 'Viewer' },
  { name: 'Kabir Malhotra', email: 'kabir.malhotra@DemoZorvynTrack.io', password: 'viewer_malhotra', role: 'Viewer' },
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

const CATEGORIES = ['Food', 'Transport', 'Education', 'Utilities', 'Health', 'Leisure', 'Electronics', 'Shopping', 'Subscriptions'];
const DESCRIPTIONS: Record<string, string[]> = {
  Food: ['UPI: Cafeteria Terminal', 'Zomato Office Protocol', 'Swiggy Dinner Sync', 'Grocery Mart Verification', 'Coffee Node Hub'],
  Transport: ['Metro Rail Auto-Sync', 'Uber Premier - Tech Node', 'Fuel Station Settlement', 'Parking Node 04', 'Auto Rickshaw UPI'],
  Education: ['Course Material Sync', 'Library Fine Protocol', 'Online Cert Verification', 'Bookstore Protocol', 'Lab Material Fee'],
  Utilities: ['Cloud Services Subscription', 'Internet Fiber Connection', 'Mobile Data Terminal Bill', 'Electricity Node Sync', 'Water Utility Verified'],
  Health: ['Pharmacy Verification', 'Gym Terminal Sync', 'Diagnostic Lab Node', 'Health Insurance Protocol', 'Medical Consultation'],
  Leisure: ['Retail Outlet Sync', 'Cinema Hub Verification', 'Gaming Lounge Node', 'Weekend Retreat Settlement', 'Concert Terminal'],
  Electronics: ['Amazon Institutional Node', 'Tech Accessory Sync', 'Hardware Component B', 'Device Maintenance Hub', 'Software License Fee'],
  Shopping: ['Apparel Hub Sync', 'Footwear Verification', 'Lifestyle Store Node', 'Personal Care Protocol', 'Home Decor Settlement'],
  Subscriptions: ['Spotify Node B', 'Netflix Terminal Sync', 'Adobe Creative Hub', 'Medium Tech Article Node', 'Newsletter Subscription']
};

const generateRandomData = () => {
  const allTransactions: Transaction[] = [];
  const baseTime = Date.now() - (30 * 86400000);

  DEMO_ACCOUNTS.forEach((user) => {
    const count = Math.floor(Math.random() * 20) + 30; 
    
    allTransactions.push({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(baseTime).toISOString().split('T')[0],
      description: 'Institutional Stipend Grant',
      amount: 15000 + Math.floor(Math.random() * 5000),
      category: 'Income',
      type: 'Income',
      ownerEmail: user.email,
      createdAt: baseTime
    });

    for (let i = 0; i < count; i++) {
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const descList = DESCRIPTIONS[category];
      const description = descList[Math.floor(Math.random() * descList.length)];
      const type: TransactionType = Math.random() > 0.9 ? 'Income' : 'Expense';
      const amount = type === 'Income' 
        ? Math.floor(Math.random() * 5000) + 1000 
        : Math.floor(Math.random() * 2000) + 50;
      
      const randomDays = Math.floor(Math.random() * 30);
      const randomHours = Math.floor(Math.random() * 24);
      const timestamp = baseTime + (randomDays * 86400000) + (randomHours * 3600000);
      const date = new Date(timestamp).toISOString().split('T')[0];

      allTransactions.push({
        id: Math.random().toString(36).substr(2, 9),
        date,
        description,
        amount,
        category,
        type,
        ownerEmail: user.email,
        createdAt: timestamp
      });
    }
  });

  return allTransactions.sort((a, b) => b.createdAt - a.createdAt);
};

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
  adminUser: User | null;
  updateProfile: (updates: Partial<User>) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  hasSeenTutorial: boolean;
  completeTutorial: () => void;
  showGreeting: boolean;
  closeGreeting: () => void;
  showPrivacy: boolean;
  setShowPrivacy: (val: boolean) => void;
  showAudit: boolean;
  setShowAudit: (val: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  isTutorialActive: boolean;
  setIsTutorialActive: (val: boolean) => void;
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
  const [adminUser, setAdminUser] = useState<User | null>(DEMO_ACCOUNTS[0]);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('zorvyn_current_user');
    const savedAdmin = localStorage.getItem('zorvyn_admin_user');
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
      setMasterLedger(generateRandomData());
    }

    if (savedAdmin) {
      setAdminUser(JSON.parse(savedAdmin));
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);
      // Ensure if the email in storage is the old admin email, we update it
      if (user.role === 'Admin' && user.email !== DEMO_ACCOUNTS[0].email) {
        user.email = DEMO_ACCOUNTS[0].email;
      }
      setCurrentUser(user);
      setUserRole(user.role);
    }

    if (tutorialSeen === 'true') {
      setHasSeenTutorial(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('zorvyn_master_ledger', JSON.stringify(masterLedger));
      localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('zorvyn_tutorial_seen', hasSeenTutorial.toString());
      localStorage.setItem('zorvyn_admin_user', JSON.stringify(adminUser));
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
  }, [masterLedger, currentUser, adminUser, isLoading, isDarkMode, hasSeenTutorial]);

  const transactions = masterLedger.filter(t => {
    if (userRole === 'Admin') return true;
    return currentUser ? t.ownerEmail === currentUser.email : false;
  });

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 1000);
  };

  const login = (email: string, password?: string) => {
    let user = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
    if (user && user.role === 'Admin' && adminUser) {
      user = adminUser;
    }
    
    if (user) {
      triggerTransition(() => {
        setCurrentUser(user);
        setUserRole(user.role);
        setShowGreeting(true);
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    triggerTransition(() => {
      setCurrentUser(null);
      setActiveView('Dashboard');
      setShowGreeting(false);
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    
    if (updatedUser.role === 'Admin') {
      setAdminUser(updatedUser);
    }
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
    setMasterLedger(generateRandomData());
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      userRole, 
      setUserRole,
      activeView,
      setActiveView: (view: ViewType) => triggerTransition(() => setActiveView(view)),
      addTransaction, 
      updateTransaction,
      deleteTransaction, 
      resetLedger,
      isLoading,
      isTransitioning,
      isDarkMode,
      setIsDarkMode,
      currentUser,
      adminUser,
      updateProfile,
      login,
      logout,
      hasSeenTutorial,
      completeTutorial: () => { setHasSeenTutorial(true); setIsTutorialActive(false); },
      showGreeting,
      closeGreeting: () => setShowGreeting(false),
      showPrivacy,
      setShowPrivacy,
      showAudit,
      setShowAudit,
      isSidebarOpen,
      setIsSidebarOpen,
      isTutorialActive,
      setIsTutorialActive
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
