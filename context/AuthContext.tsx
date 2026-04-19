import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProfile = {
  name: string;
  gender: 'Uomo' | 'Donna' | 'Altro';
  emailOrPhone: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isGuest: boolean;
  trialStartedAt: number | null;
  isLoading: boolean;
  login: (profile: UserProfile) => Promise<void>;
  startGuestTrial: () => Promise<void>;
  logout: () => Promise<void>;
  daysRemaining: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TRIAL_DURATION_DAYS = 15;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [trialStartedAt, setTrialStartedAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('@auth_user');
      const guestStatus = await AsyncStorage.getItem('@auth_is_guest');
      const trialStart = await AsyncStorage.getItem('@auth_trial_start');

      if (userData) setUser(JSON.parse(userData));
      if (guestStatus === 'true') setIsGuest(true);
      if (trialStart) setTrialStartedAt(parseInt(trialStart, 10));
    } catch (e) {
      console.error('Failed to load auth state', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (profile: UserProfile) => {
    setUser(profile);
    setIsGuest(false);
    setTrialStartedAt(null);
    await AsyncStorage.setItem('@auth_user', JSON.stringify(profile));
    await AsyncStorage.removeItem('@auth_is_guest');
    await AsyncStorage.removeItem('@auth_trial_start');
  };

  const startGuestTrial = async () => {
    const startTime = Date.now();
    setIsGuest(true);
    setTrialStartedAt(startTime);
    setUser(null);
    await AsyncStorage.setItem('@auth_is_guest', 'true');
    await AsyncStorage.setItem('@auth_trial_start', startTime.toString());
    await AsyncStorage.removeItem('@auth_user');
  };

  const logout = async () => {
    setUser(null);
    setIsGuest(false);
    setTrialStartedAt(null);
    await AsyncStorage.multiRemove(['@auth_user', '@auth_is_guest', '@auth_trial_start']);
  };

  const getDaysRemaining = () => {
    if (!trialStartedAt) return 0;
    const diffMs = Date.now() - trialStartedAt;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(0, TRIAL_DURATION_DAYS - diffDays);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      trialStartedAt, 
      isLoading, 
      login, 
      startGuestTrial, 
      logout,
      daysRemaining: getDaysRemaining()
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
