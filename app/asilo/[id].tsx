import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ASYLUM_LAWS, markLawAsRead } from '../../constants/asylum_laws';
import { Ionicons } from '@expo/vector-icons';

export default function LawDetailScreen() {
  const { id } = useLocalSearchParams();
  const law = ASYLUM_LAWS.find(l => l.id === id);

  useEffect(() => {
    if (law && law.isNew) {
       // Requirement: "una volta letta lo sfondo sparisce automaticamente".
       // Segniamo la legge come letta appena la apre. La UI tornerà bianca quando torna indietro.
       markLawAsRead(law.id);
    }
  }, [law]);

  if (!law) {
    return <View style={styles.container}><Text style={{padding: 20}}>Legge non trovata</Text></View>;
  }

  const formattedDate = law.dateAdded ? law.dateAdded.split('-').reverse().join('/') : '';

  return (
    <>
      {/* Dynamic Header */}
      <Stack.Screen options={{ title: 'Asilo' }} />
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 80 }} showsVerticalScrollIndicator={true}>
        
        {/* Banner decorativo se novità */}
        {law.isNew && (
            <View style={styles.bannerNewLayer}>
                <Ionicons name="sparkles" size={12} color="#fff" />
                <Text style={styles.bannerNewText}>NOVITÀ: {formattedDate}</Text>
            </View>
        )}

        <Text style={styles.title}>{law.title}</Text>
        
        <View style={styles.refBox}>
            <Ionicons name="book" size={24} color="#0f4c81" />
            <Text style={styles.refText}>{law.lawReference}</Text>
        </View>

        <Text style={styles.sectionTitle}>Descrizione Generale</Text>
        <Text style={styles.paragraph}>{law.description}</Text>
        
        <Text style={styles.sectionTitle}>Requisiti per il Rilascio</Text>
        {law.requirements.map((req, i) => (
           <View key={i} style={styles.bulletItem}>
               <View style={styles.bulletPoint} />
               <Text style={styles.paragraphBullet}>{req}</Text>
           </View>
        ))}

        {law.documentsNeeded && (
           <>
             <Text style={styles.sectionTitle}>Documenti Necessari</Text>
             {law.documentsNeeded.map((doc, i) => (
                <View key={i} style={styles.bulletItem}>
                    <Ionicons name="document-attach-outline" size={18} color="#0ea5e9" style={{marginTop: 4, marginRight: 10}} />
                    <Text style={styles.paragraphBullet}>{doc}</Text>
                </View>
             ))}
           </>
        )}

        {law.whereToApply && (
           <>
             <Text style={styles.sectionTitle}>Dove presentare Domanda</Text>
             <View style={styles.whereBox}>
                 <Ionicons name="location-outline" size={22} color="#059669" style={{marginTop: 2}}/>
                 <Text style={styles.whereText}>{law.whereToApply}</Text>
             </View>
           </>
        )}

        <Text style={styles.sectionTitle}>Durata e Validità</Text>
        <View style={styles.durationBox}>
            <Ionicons name="time-outline" size={22} color="#ea580c" style={{marginTop: 2}}/>
            <Text style={styles.durationText}>{law.duration}</Text>
        </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bannerNewLayer: { flexDirection: 'row', backgroundColor: '#ef4444', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, marginBottom: 14, alignItems: 'center' },
  bannerNewText: { color: '#fff', fontSize: 10, fontWeight: '800', marginLeft: 4, letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 16, lineHeight: 28 }, 
  refBox: { flexDirection: 'row', backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#e2e8f0' },
  refText: { color: '#475569', fontWeight: '600', marginLeft: 10, fontSize: 13, flexShrink: 1, lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0f4c81', marginTop: 16, marginBottom: 12 }, 
  paragraph: { fontSize: 16, color: '#334155', lineHeight: 26, marginBottom: 20 },
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  bulletPoint: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#0ea5e9', marginTop: 10, marginRight: 12 },
  paragraphBullet: { fontSize: 16, color: '#334155', lineHeight: 26, flexShrink: 1 },
  durationBox: { flexDirection: 'row', backgroundColor: '#f0f9ff', padding: 16, borderRadius: 12, alignItems: 'flex-start', borderLeftWidth: 4, borderLeftColor: '#0ea5e9', marginBottom: 20 },
  durationText: { color: '#0369a1', fontWeight: '500', marginLeft: 12, fontSize: 16, flexShrink: 1, lineHeight: 24 },
  whereBox: { flexDirection: 'row', backgroundColor: '#ecfdf5', padding: 16, borderRadius: 12, alignItems: 'flex-start', borderLeftWidth: 4, borderLeftColor: '#10b981', marginBottom: 20 },
  whereText: { color: '#047857', fontWeight: '500', marginLeft: 12, fontSize: 16, flexShrink: 1, lineHeight: 24 },
});
