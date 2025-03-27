'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '@/lib/firebase-auth';
import { onAuthStateChanged, signOut as firebaseSignOut, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Set persistence to LOCAL to ensure it survives page refreshes
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence in context:', error);
  });

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { throw new Error('Not implemented'); },
  signInWithEmail: async () => { throw new Error('Not implemented'); },
  signUpWithEmail: async () => { throw new Error('Not implemented'); },
  resetPassword: async () => { throw new Error('Not implemented'); },
  signOut: async () => { throw new Error('Not implemented'); },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithEmail = async (email: string, password: string): Promise<void> => {
    await signInWithEmail(email, password);
  };

  const handleSignUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      return await signUpWithEmail(email, password, displayName);
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithGoogle,
      signInWithEmail: handleSignInWithEmail,
      signUpWithEmail: handleSignUpWithEmail,
      resetPassword: handleResetPassword,
      signOut: handleSignOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
