import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  createTrainer: (name: string, email: string, password: string) => void;
  getAllUsers: () => User[];
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Load user and allUsers from local storage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('futurex_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedAllUsers = localStorage.getItem('futurex_all_users');
      if (storedAllUsers) {
        setAllUsers(JSON.parse(storedAllUsers));
      } else {
        // Initialize with MOCK_USERS if no local storage
        setAllUsers(MOCK_USERS);
        try {
           localStorage.setItem('futurex_all_users', JSON.stringify(MOCK_USERS));
        } catch (e) { console.error("Storage full during init"); }
      }
    } catch (e) {
      console.error("Error accessing local storage", e);
    }
  }, []);

  // Persist allUsers whenever it changes
  useEffect(() => {
    if (allUsers.length > 0) {
      try {
        localStorage.setItem('futurex_all_users', JSON.stringify(allUsers));
      } catch (error) {
        console.error("Failed to save users to local storage (likely quota exceeded)", error);
        // We do not alert here to avoid spamming the user, but this prevents the crash.
      }
    }
  }, [allUsers]);

  const login = (email: string, password: string, role: UserRole) => {
    const foundUser = allUsers.find(u => u.email === email && u.role === role);
    
    // In a real app, you would hash the password. Here we compare plain text.
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      try {
        localStorage.setItem('futurex_user', JSON.stringify(foundUser));
      } catch (e) { console.error("Login storage failed", e); }
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      password,
      avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`,
      bio: `New ${role.toLowerCase()} at FutureX.`
    };
    
    setAllUsers(prev => [...prev, newUser]);
    setUser(newUser); // Auto login after register
    try {
      localStorage.setItem('futurex_user', JSON.stringify(newUser));
    } catch (e) { console.error("Register storage failed", e); }
  };

  const createTrainer = (name: string, email: string, password: string) => {
    const newTrainer: User = {
      id: `t${Date.now()}`,
      name,
      email,
      password,
      role: UserRole.TRAINER,
      avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`,
      bio: 'Expert Trainer at FutureX.'
    };
    setAllUsers(prev => [...prev, newTrainer]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('futurex_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      try {
        localStorage.setItem('futurex_user', JSON.stringify(updatedUser));
      } catch (e) {
        console.error("Failed to update user in storage", e);
        throw e; // Re-throw to let the component know it failed
      }
      
      // Also update in allUsers list (Triggering the useEffect)
      setAllUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const getAllUsers = () => allUsers;

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout, updateUser, register, createTrainer, getAllUsers, isAuthenticated: !!user } },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};