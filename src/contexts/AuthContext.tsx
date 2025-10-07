import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  getUserResume: () => ResumeData | null;
  saveUserResume: (resumeData: ResumeData) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }

    // Initialize demo user if no users exist
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      const demoUser = {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('users', JSON.stringify([demoUser]));
    }

    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userSession = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          createdAt: foundUser.createdAt
        };
        
        setUser(userSession);
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find((u: StoredUser) => u.email === email)) {
        return false; // User already exists
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };
      
      // Save to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Sign in the new user
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      };
      
      setUser(userSession);
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const getUserResume = (): ResumeData | null => {
    if (!user) return null;
    
    try {
      const resumeKey = `resume_${user.id}`;
      const savedResume = localStorage.getItem(resumeKey);
      return savedResume ? JSON.parse(savedResume) : null;
    } catch (error) {
      console.error('Error loading user resume:', error);
      return null;
    }
  };

  const saveUserResume = (resumeData: ResumeData) => {
    if (!user) return;
    
    try {
      const resumeKey = `resume_${user.id}`;
      localStorage.setItem(resumeKey, JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving user resume:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    getUserResume,
    saveUserResume
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}