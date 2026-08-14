/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Authentication Context for ISPC-ACAD-MIA
 * NOTE: This is a prototype authentication system for development/testing purposes.
 * DO NOT use this for production. Passwords are hashed with a simple algorithm for demonstration only.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { INITIAL_USERS } from '../data/mockUsers';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  users: UserProfile[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    nom: string;
    email: string;
    dni: string;
    oposicio: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string; user?: UserProfile }>;
  logout: () => void;
  setCurrentUser: (user: UserProfile | null) => void;
  setUsers: (users: UserProfile[]) => void;
  // Development only: switch user for testing
  devSwitchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * PROTOTYPE ONLY: Simple hash function for demo authentication
 * DO NOT use this in production
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'proto_' + Math.abs(hash).toString(36);
}

/**
 * Generate unique ID for new users
 */
function generateUserId(): string {
  return 'usr-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth_session');
    const storedUsers = localStorage.getItem('auth_users');
    const storedPasswordHashes = localStorage.getItem('auth_passwords');

    let allUsers = [...INITIAL_USERS];

    if (storedUsers) {
      try {
        const registeredUsers = JSON.parse(storedUsers);
        allUsers = [...INITIAL_USERS, ...registeredUsers];
      } catch (e) {
        console.error('Failed to parse stored users:', e);
      }
    }

    setUsers(allUsers);

    if (storedAuth) {
      try {
        const session = JSON.parse(storedAuth);
        const user = allUsers.find(u => u.id === session.userId);
        if (user) {
          setCurrentUser(user);
        }
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const storedPasswordHashes = localStorage.getItem('auth_passwords');
    let passwordMap: Record<string, string> = {};

    if (storedPasswordHashes) {
      try {
        passwordMap = JSON.parse(storedPasswordHashes);
      } catch (e) {
        console.error('Failed to parse password map:', e);
      }
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    // Check password
    const hashedPassword = simpleHash(password);
    const storedHash = passwordMap[user.id];

    if (!storedHash || storedHash !== hashedPassword) {
      // For INITIAL_USERS, allow login with any password (demo mode)
      if (!INITIAL_USERS.find(u => u.id === user.id)) {
        return { success: false, error: 'Contraseña incorrecta' };
      }
    }

    // Set current user and store session
    setCurrentUser(user);
    localStorage.setItem('auth_session', JSON.stringify({ userId: user.id }));

    return { success: true };
  };

  const register = async (userData: {
    nom: string;
    email: string;
    dni: string;
    oposicio: string;
    password: string;
  }): Promise<{ success: boolean; error?: string; user?: UserProfile }> => {
    // Validate email doesn't exist
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'El correo electrónico ya está registrado' };
    }

    // Validate DNI doesn't exist
    if (users.find(u => u.dni === userData.dni)) {
      return { success: false, error: 'El DNI ya está registrado' };
    }

    // Create new user
    const newUser: UserProfile = {
      id: generateUserId(),
      nom: userData.nom,
      email: userData.email,
      dni: userData.dni,
      oposicio: userData.oposicio,
      role: 'alumne',
      estatPagament: 'pendent' as const,
      dataRegistre: new Date().toLocaleDateString('ca-ES'),
    };

    // Store password hash
    const passwordMap: Record<string, string> = JSON.parse(
      localStorage.getItem('auth_passwords') || '{}'
    );
    passwordMap[newUser.id] = simpleHash(userData.password);
    localStorage.setItem('auth_passwords', JSON.stringify(passwordMap));

    // Add to users list and store in localStorage
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    const registeredUsers = updatedUsers.filter(u => !INITIAL_USERS.find(iu => iu.id === u.id));
    localStorage.setItem('auth_users', JSON.stringify(registeredUsers));

    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_session');
  };

  const devSwitchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('auth_session', JSON.stringify({ userId: user.id }));
    }
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    users,
    login,
    register,
    logout,
    setCurrentUser,
    setUsers,
    devSwitchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
