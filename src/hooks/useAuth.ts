import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService } from '../services/authService';
import { AuthUser, SignUpData, SignInData } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(authService.formatUser(firebaseUser));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setError(null);
      const user = await authService.signUp(data);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setError(null);
      const user = await authService.signIn(data);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };
}