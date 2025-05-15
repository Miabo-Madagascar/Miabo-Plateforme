import React, { createContext, useContext, useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export type UserRole = 'student' | 'tutor' | 'parent' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('miabo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login functionality
  const login = async (email: string, password: string): Promise<void> => {
    // For prototype purposes, we'll mock the authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email and password are provided
        if (!email || !password) {
          reject('Email et mot de passe requis');
          return;
        }

        // This is a mock - in a real app, this would be an API call
        const mockUsers = [
          {
            id: '1',
            name: 'Élève Demo',
            email: 'eleve@exemple.com',
            role: 'student' as UserRole,
            profileImage: 'https://i.pravatar.cc/150?img=1',
          },
          {
            id: '2',
            name: 'Tuteur Demo',
            email: 'tuteur@exemple.com',
            role: 'tutor' as UserRole,
            profileImage: 'https://i.pravatar.cc/150?img=2',
          },
          {
            id: '3',
            name: 'Parent Demo',
            email: 'parent@exemple.com',
            role: 'parent' as UserRole,
            profileImage: 'https://i.pravatar.cc/150?img=3',
          },
        ];

        const foundUser = mockUsers.find((user) => user.email === email);

        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          localStorage.setItem('miabo_user', JSON.stringify(foundUser));
          resolve();
        } else {
          reject('Email ou mot de passe incorrect');
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('miabo_user');
  };

  // Mock register functionality
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password || !role) {
          reject('Tous les champs sont requis');
          return;
        }

        // In a real app, this would be an API call to register the user
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role,
          profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('miabo_user', JSON.stringify(newUser));
        resolve();
      }, 800); // Simulate network delay
    });
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
