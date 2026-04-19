import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Appointment = {
  id: string;
  title: string;
  location: string;
  date: string; // ISO string
  time: string; // HH:mm
  message?: string; // Motivo dell'appuntamento
  advance: number; // Minuti prima per la chiamata (10, 30, 60, 120, 1440)
  notes?: string;
};

type ReminderContextType = {
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id'>) => Promise<void>;
  removeAppointment: (id: string) => Promise<void>;
  isLoading: boolean;
};

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const stored = await AsyncStorage.getItem('@appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load appointments', e);
    } finally {
      setIsLoading(false);
    }
  };

  const addAppointment = async (app: Omit<Appointment, 'id'>) => {
    const newApp = { ...app, id: Math.random().toString(36).substr(2, 9) };
    const updated = [newApp, ...appointments];
    setAppointments(updated);
    await AsyncStorage.setItem('@appointments', JSON.stringify(updated));
  };

  const removeAppointment = async (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    await AsyncStorage.setItem('@appointments', JSON.stringify(updated));
  };

  return (
    <ReminderContext.Provider value={{ appointments, addAppointment, removeAppointment, isLoading }}>
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}
