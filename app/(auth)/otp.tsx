import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OTPScreen() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      Alert.alert('Errore', 'Inserisci il codice completo a 6 cifre.');
      return;
    }
    
    // Simulate verification (any 6 digits accepted)
    router.replace({
      pathname: '/(auth)/profile',
      params: { emailOrPhone: contact as string }
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

      <View style={styles.content}>
        <Text style={styles.title}>Verifica</Text>
        <Text style={styles.subtitle}>Abbiamo inviato un codice di sicurezza a:</Text>
        <Text style={styles.contactText}>{contact}</Text>
        
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verifica Codice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Non hai ricevuto il codice? <Text style={styles.resendTextBold}>Reinvia</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  backButton: { marginLeft: 10, backgroundColor: '#fff', padding: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, elevation: 2 },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 100, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#0f4c81', marginBottom: 12, alignSelf: 'flex-start' },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 6, alignSelf: 'flex-start' },
  contactText: { fontSize: 16, color: '#0f4c81', fontWeight: '700', marginBottom: 40, alignSelf: 'flex-start' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 40 },
  otpInput: { 
    width: 48, 
    height: 56, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: '#e2e8f0', 
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#0f4c81' 
  },
  button: { 
    backgroundColor: '#0f4c81', 
    width: '100%',
    height: 56, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  resendButton: { padding: 10 },
  resendText: { color: '#64748b', fontSize: 14 },
  resendTextBold: { color: '#0f4c81', fontWeight: '700' }
});
