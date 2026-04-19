import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [contact, setContact] = useState('');

  const handleSendOTP = () => {
    if (!contact.trim()) {
      Alert.alert('Errore', 'Inserisci un indirizzo email o un numero di telefono.');
      return;
    }
    
    // Simulate sending OTP
    router.push({
      pathname: '/(auth)/otp',
      params: { contact }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: '', 
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0f4c81" />
          </TouchableOpacity>
        )
      }} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>Iniziamo</Text>
        <Text style={styles.subtitle}>Inserisci la tua email o il numero di telefono per ricevere il codice di sicurezza.</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email o numero di telefono (+39)"
            placeholderTextColor="#94a3b8"
            value={contact}
            onChangeText={setContact}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Invia Codice OTP</Text>
          <Ionicons name="send-outline" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#059669" />
          <Text style={styles.infoText}>I tuoi dati sono protetti e utilizzati solo per l'autenticazione istituzionale.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  backButton: { marginLeft: 10, backgroundColor: '#fff', padding: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, elevation: 2 },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 100 },
  title: { fontSize: 28, fontWeight: '800', color: '#0f4c81', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 22, marginBottom: 40 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 24
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1e293b', fontWeight: '500' },
  button: { 
    backgroundColor: '#0f4c81', 
    flexDirection: 'row',
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  infoBox: { 
    marginTop: 'auto', 
    marginBottom: 40, 
    flexDirection: 'row', 
    backgroundColor: '#ecfdf5', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    gap: 12 
  },
  infoText: { flex: 1, color: '#047857', fontSize: 13, lineHeight: 18, fontWeight: '500' }
});
