import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type VirtualCallProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  location: string;
  message?: string;
  date?: string;
  time?: string;
};

export default function VirtualCall({ visible, onClose, title, location, message, date, time }: VirtualCallProps) {
  const [status, setStatus] = useState<'incoming' | 'active' | 'ended'>('incoming');
  const [timer, setTimer] = useState(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (visible) {
      setStatus('incoming');
      setTimer(0);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [visible]);

  useEffect(() => {
    let interval: any;
    if (status === 'active') {
      interval = setInterval(() => {
        setTimer(prev => {
          const next = prev + 1;
          // Auto-end call after 35 seconds
          if (next >= 35) {
            setStatus('ended');
            clearInterval(interval);
            setTimeout(() => onClose(), 2000);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAccept = () => {
    setStatus('active');
  };

  const handleDecline = () => {
    setStatus('ended');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // Build the gentle, detailed assistant speech
  const displayMessage = message || title;
  const speechText = `"Buongiorno! Sono l'Assistente InfoStranieri. La chiamo per ricordarle gentilmente che ha un appuntamento${date ? ` previsto per il ${date}` : ''}${time ? ` alle ore ${time}` : ''}, presso ${location}. Il motivo del suo appuntamento è: ${displayMessage}. Le consiglio di preparare tutti i documenti necessari in anticipo e di arrivare con qualche minuto di anticipo. Le auguriamo una buona giornata! 😊"`;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFill, styles.bgGradient]} />

        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Animated.View style={[styles.avatarContainer, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.avatar}>
                <Ionicons name="headset" size={50} color="#fff" />
              </View>
            </Animated.View>
            <Text style={styles.callerName}>Assistente InfoStranieri</Text>
            <Text style={styles.callStatus}>
              {status === 'incoming' ? 'Chiamata in arrivo...' : status === 'active' ? `In chiamata · ${formatTime(timer)}` : 'Chiamata terminata'}
            </Text>
          </View>

          {status === 'active' && (
            <View style={styles.messageBox}>
              <Text style={styles.messageLabel}>🎤 Messaggio Vocale</Text>
              <Text style={styles.messageText}>{speechText}</Text>
              <View style={styles.waveContainer}>
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                   <View key={i} style={[styles.waveBar, { height: 6 + Math.random() * 24 }]} />
                ))}
              </View>
            </View>
          )}

          <View style={styles.footer}>
            {status === 'incoming' ? (
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
                  <Ionicons name="close" size={32} color="#fff" />
                  <Text style={styles.actionLabel}>Rifiuta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
                  <Ionicons name="call" size={32} color="#fff" />
                  <Text style={styles.actionLabel}>Rispondi</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.hangupBtn} onPress={handleDecline}>
                <Ionicons name="call" size={32} color="#fff" style={{ transform: [{ rotate: '135deg' }] }} />
                <Text style={styles.actionLabel}>Chiudi</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  bgGradient: { backgroundColor: '#0a1628' },
  content: { flex: 1, justifyContent: 'space-between', paddingVertical: 60 },
  header: { alignItems: 'center', marginTop: 40 },
  avatarContainer: { marginBottom: 20 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  callerName: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 8, textAlign: 'center' },
  callStatus: { fontSize: 16, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 24, padding: 20, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  messageLabel: {
    fontSize: 11, fontWeight: '800', color: '#f59e0b',
    textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1.5,
  },
  messageText: { fontSize: 15, color: '#fff', lineHeight: 24, fontWeight: '500', fontStyle: 'italic' },
  waveContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: 16, height: 30 },
  waveBar: { width: 4, backgroundColor: '#0ea5e9', borderRadius: 2 },
  footer: { paddingBottom: 40, alignItems: 'center' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 40 },
  actionLabel: { color: '#fff', fontSize: 12, fontWeight: '700', marginTop: 8 },
  acceptBtn: {
    backgroundColor: '#22c55e', width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#22c55e', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, elevation: 8,
  },
  declineBtn: {
    backgroundColor: '#ef4444', width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#ef4444', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, elevation: 8,
  },
  hangupBtn: {
    backgroundColor: '#ef4444', width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#ef4444', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, elevation: 8,
  },
});
