import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const GENDER_OPTIONS = ['Uomo', 'Donna', 'Altro'] as const;

export default function ProfileScreen() {
  const router = useRouter();
  const { emailOrPhone } = useLocalSearchParams();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState<typeof GENDER_OPTIONS[number] | null>(null);

  const handleComplete = async () => {
    if (!name.trim()) {
      Alert.alert('Errore', 'Inserisci il tuo nome.');
      return;
    }
    if (!gender) {
      Alert.alert('Errore', 'Seleziona il tuo genere.');
      return;
    }

    await login({
      name,
      gender,
      emailOrPhone: emailOrPhone as string
    });

    router.replace('/(tabs)');
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Completa il Profilo</Text>
        <Text style={styles.subtitle}>Raccontaci qualcosa di te per personalizzare la tua esperienza istituzionale.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Come ti chiami?</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Inserisci il tuo nome completo"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Genere</Text>
          <View style={styles.optionsContainer}>
            {GENDER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionCard,
                  gender === option && styles.optionCardSelected
                ]}
                onPress={() => setGender(option)}
              >
                <View style={[
                  styles.radioOuter,
                  gender === option && styles.radioOuterSelected
                ]}>
                  {gender === option && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.optionText,
                  gender === option && styles.optionTextSelected
                ]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Completa Registrazione</Text>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  backButton: { marginLeft: 10, backgroundColor: '#fff', padding: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, elevation: 2 },
  scrollContent: { paddingHorizontal: 30, paddingTop: 100, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#0f4c81', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 22, marginBottom: 32 },
  section: { marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    paddingHorizontal: 16,
    height: 60
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1e293b', fontWeight: '500' },
  optionsContainer: { gap: 12 },
  optionCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0' 
  },
  optionCardSelected: { borderColor: '#0f4c81', backgroundColor: '#f0f9ff' },
  radioOuter: { 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#cbd5e1', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 14
  },
  radioOuterSelected: { borderColor: '#0f4c81' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0f4c81' },
  optionText: { fontSize: 16, color: '#445469', fontWeight: '600' },
  optionTextSelected: { color: '#0f4c81' },
  button: { 
    backgroundColor: '#0f4c81', 
    flexDirection: 'row',
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' }
});
