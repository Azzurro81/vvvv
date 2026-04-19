import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { startGuestTrial, isGuest, daysRemaining } = useAuth();

  const handleGuestEntry = async () => {
    if (!isGuest) {
      await startGuestTrial();
    }
    router.replace('/(tabs)');
  };

  // If user already started a trial, show remaining days
  const trialText = isGuest 
    ? `Mancano ${daysRemaining} giorni` 
    : 'Ancora 15 giorni';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>InfoStranieri</Text>
          <Text style={styles.tagline}>Il tuo compagno istituzionale in Italia</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.primaryButtonText}>Registrati ora</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleGuestEntry}
          >
            <Text style={styles.secondaryButtonText}>Entra come Ospite</Text>
          </TouchableOpacity>
          
          <View style={styles.trialInfoContainer}>
            <Text style={styles.trialInfo}>{trialText}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>InfoStranieri 2026 • Versione 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 60 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  brandName: { fontSize: 32, fontWeight: '900', color: '#0f4c81', letterSpacing: -0.5 },
  tagline: { fontSize: 16, color: '#64748b', marginTop: 8, textAlign: 'center', fontWeight: '500' },
  buttonContainer: { width: '100%', gap: 16 },
  primaryButton: { 
    backgroundColor: '#0f4c81', 
    flexDirection: 'row',
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#0f4c81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '700', marginRight: 10 },
  secondaryButton: { 
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0'
  },
  secondaryButtonText: { color: '#475569', fontSize: 17, fontWeight: '600' },
  trialInfoContainer: {
    backgroundColor: '#fef3c7', // light amber/yellow
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: -8,
  },
  trialInfo: { textAlign: 'center', color: '#b45309', fontSize: 13, fontWeight: '700' },
  footer: { paddingBottom: 20, alignItems: 'center' },
  footerText: { color: '#cbd5e1', fontSize: 12, fontWeight: '600' }
});
