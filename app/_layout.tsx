import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ReminderProvider } from '../context/ReminderContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { user, isGuest, daysRemaining, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !isGuest && !inAuthGroup) {
      // Not logged in or guest -> redirect to auth
      router.replace('/(auth)');
    } else if (isGuest && daysRemaining <= 0 && !inAuthGroup) {
      // Trial expired -> force registration
      router.replace('/(auth)/register');
    } else if ((user || (isGuest && daysRemaining > 0)) && inAuthGroup) {
      // Authenticated -> move to app
      router.replace('/(tabs)');
    }
  }, [user, isGuest, daysRemaining, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="asilo" />
      <Stack.Screen name="kit" />
      <Stack.Screen name="festival" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      <Stack.Screen name="reminders/index" options={{ title: 'Promemoria con chiamata', headerShown: true, headerStyle: { backgroundColor: '#0f4c81' }, headerTintColor: '#fff' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <LanguageProvider>
        <ReminderProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootLayoutNav />
            <StatusBar style="auto" />
          </ThemeProvider>
        </ReminderProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
