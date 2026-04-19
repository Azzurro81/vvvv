import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useReminders, Appointment } from '../../context/ReminderContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import VirtualCall from '../../components/VirtualCall';

const ADVANCE_OPTIONS = [
  { value: 10, label: '10 minuti prima' },
  { value: 30, label: '30 minuti prima' },
  { value: 60, label: '1 ora prima' },
  { value: 120, label: '2 ore prima' },
  { value: 1440, label: '1 giorno prima' },
];

export default function RemindersScreen() {
  const { appointments, addAppointment, removeAppointment } = useReminders();
  const { user, isGuest } = useAuth();
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCallVisible, setIsCallVisible] = useState(false);
  const [callData, setCallData] = useState<{ title: string; location: string; message: string; date: string; time: string } | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [advance, setAdvance] = useState(30);

  if (isGuest) {
    return (
      <View style={styles.center}>
        <Ionicons name="lock-closed" size={64} color="#94a3b8" />
        <Text style={styles.guestTitle}>Area Riservata</Text>
        <Text style={styles.guestSubtitle}>Registrati per gestire i tuoi appuntamenti e ricevere promemoria vocali.</Text>
      </View>
    );
  }

  const handleAdd = async () => {
    if (!title || !location || !date || !time || !message) {
      Alert.alert('⚠️ Errore', 'Compila tutti i campi per salvare il promemoria.');
      return;
    }
    await addAppointment({ title, location, date, time, message, advance });
    setModalVisible(false);
    setTitle('');
    setLocation('');
    setDate('');
    setTime('');
    setMessage('');
    setAdvance(30);
  };

  const simulateCall = (app: Appointment) => {
    setCallData({
      title: app.title,
      location: app.location,
      message: app.message || app.title,
      date: app.date,
      time: app.time,
    });
    setIsCallVisible(true);
  };

  const getAdvanceLabel = (val: number) => {
    return ADVANCE_OPTIONS.find(o => o.value === val)?.label || `${val} min prima`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={() => (
          <Text style={styles.headerSubtitle}>Gestisci le tue scadenze istituzionali</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.appCard}>
            <View style={styles.appInfo}>
              <Text style={styles.appTitle}>
                <Ionicons name="calendar" size={16} color="#1e40af" /> {item.title}
              </Text>
              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={15} color="#64748b" />
                <Text style={styles.appDate}>{item.date}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="time-outline" size={15} color="#64748b" />
                <Text style={styles.appLocation}>Ore {item.time}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={15} color="#64748b" />
                <Text style={styles.appLocation}>{item.location}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="notifications-outline" size={15} color="#f59e0b" />
                <Text style={styles.advanceText}>Chiamata: {getAdvanceLabel(item.advance)}</Text>
              </View>
              {item.message ? (
                <View style={styles.msgBox}>
                  <Text style={styles.msgText}>"{item.message}"</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.callBtn} onPress={() => simulateCall(item)}>
                <Ionicons name="call" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => removeAppointment(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="calendar-clear-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>Nessun promemoria salvato.</Text>
            <Text style={styles.emptyHint}>Tocca + per aggiungere il tuo primo appuntamento.</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal Aggiunta Promemoria */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuovo Promemoria</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#334155" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={{ padding: 20 }}>
              <Text style={styles.label}>
                <Ionicons name="calendar" size={14} color="#1e40af" /> Data Appuntamento
              </Text>
              <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Es: 20/04/2026" placeholderTextColor="#94a3b8" />
              
              <Text style={styles.label}>
                <Ionicons name="time" size={14} color="#1e40af" /> Orario
              </Text>
              <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="Es: 10:00" placeholderTextColor="#94a3b8" />

              <Text style={styles.label}>
                <Ionicons name="pencil" size={14} color="#1e40af" /> Motivo dell'appuntamento
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Es: Rinnovo permesso in Questura, portare documenti..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
              />

              <Text style={styles.label}>
                <Ionicons name="location" size={14} color="#1e40af" /> Dove
              </Text>
              <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Es: Questura di Roma, Via..." placeholderTextColor="#94a3b8" />

              <Text style={styles.label}>
                <Ionicons name="notifications" size={14} color="#f59e0b" /> Quando vuoi essere chiamato?
              </Text>
              <View style={styles.advanceGrid}>
                {ADVANCE_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.advanceChip, advance === opt.value && styles.advanceChipActive]}
                    onPress={() => setAdvance(opt.value)}
                  >
                    <Text style={[styles.advanceChipText, advance === opt.value && styles.advanceChipTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                <Ionicons name="checkmark" size={22} color="#fff" />
                <Text style={styles.saveBtnText}>Salva Promemoria</Text>
              </TouchableOpacity>

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Simulazione Chiamata Virtuale */}
      <VirtualCall 
        visible={isCallVisible} 
        onClose={() => setIsCallVisible(false)} 
        title={callData?.title || ''} 
        location={callData?.location || ''} 
        message={callData?.message || ''}
        date={callData?.date || ''}
        time={callData?.time || ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  guestTitle: { fontSize: 24, fontWeight: '900', color: '#0f4c81', marginTop: 20 },
  guestSubtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  headerSubtitle: { fontSize: 14, color: '#64748b', fontWeight: '600', marginBottom: 20 },
  appCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14,
    flexDirection: 'row', alignItems: 'flex-start',
    borderWidth: 1, borderColor: '#e2e8f0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, elevation: 2,
  },
  appInfo: { flex: 1 },
  appTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  appLocation: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  appDate: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  advanceText: { fontSize: 13, color: '#f59e0b', fontWeight: '600' },
  msgBox: {
    backgroundColor: '#f1f5f9', borderRadius: 10, padding: 10, marginTop: 8,
  },
  msgText: { fontSize: 13, color: '#334155', fontStyle: 'italic', lineHeight: 18 },
  actions: { gap: 10, marginLeft: 12 },
  callBtn: { backgroundColor: '#10b981', width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  deleteBtn: { backgroundColor: '#fee2e2', width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#94a3b8', fontSize: 16, marginTop: 12, fontWeight: '600' },
  emptyHint: { color: '#cbd5e1', fontSize: 14, marginTop: 6, fontWeight: '500' },
  fab: {
    position: 'absolute', right: 20, bottom: 20,
    backgroundColor: '#1e40af', width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#1e40af', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, elevation: 8,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, height: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#0f4c81' },
  label: { fontSize: 12, fontWeight: '800', color: '#475569', marginBottom: 8, marginTop: 18, textTransform: 'uppercase', letterSpacing: 0.8 },
  input: {
    backgroundColor: '#f8fafc', borderRadius: 14, padding: 14, fontSize: 15,
    color: '#1e293b', borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  advanceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  advanceChip: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#f1f5f9', borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  advanceChipActive: { backgroundColor: '#1e40af', borderColor: '#1e40af' },
  advanceChipText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  advanceChipTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#1e40af', borderRadius: 16, padding: 18,
    alignItems: 'center', marginTop: 28, flexDirection: 'row', justifyContent: 'center', gap: 8,
    shadowColor: '#1e40af', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, elevation: 8,
  },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
