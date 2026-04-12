import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { CITIZENSHIP_LAWS, markLawAsRead } from '../../../constants/citizenship_laws';
import { Ionicons } from '@expo/vector-icons';

export default function CittadinanzaLawDetailScreen() {
  const { id } = useLocalSearchParams();
  const law = CITIZENSHIP_LAWS.find(l => l.id === id);

  useEffect(() => {
    if (law && law.isNew) {
       markLawAsRead(law.id);
    }
  }, [law]);

  if (!law) {
    return <View style={styles.container}><Text style={{padding: 20}}>Normativa non trovata</Text></View>;
  }

  const formattedDate = law.dateAdded ? law.dateAdded.split('-').reverse().join('/') : '';

  return (
    <>
      <Stack.Screen options={{ title: 'Dettaglio Normativa' }} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={true}>
        
        <View style={styles.headerArea}>
            {law.isNew && (
                <View style={styles.bannerNewLayer}>
                    <Ionicons name="sparkles" size={12} color="#fff" />
                    <Text style={styles.bannerNewText}>NOVITÀ: {formattedDate}</Text>
                </View>
            )}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{law.title}</Text>
            </View>
        </View>

        <View style={styles.contentPadding}>
            <View style={styles.refBox}>
                <Ionicons name="book-outline" size={20} color="#0369a1" />
                <Text style={styles.refText}>{law.lawReference}</Text>
            </View>

            <Text style={styles.sectionTitle}>Descrizione</Text>
            <Text style={styles.paragraph}>{law.description}</Text>
            
            <Text style={styles.sectionTitle}>Requisiti per il Riconoscimento</Text>
            {law.requirements.map((req, i) => (
            <View key={i} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.paragraphBullet}>{req}</Text>
            </View>
            ))}

            {law.documentsNeeded && (
            <>
                <Text style={styles.sectionTitle}>Documentazione da Presentare</Text>
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
                <Text style={styles.sectionTitle}>Canali di Presentazione</Text>
                <View style={styles.whereBox}>
                    <Ionicons name="location-outline" size={22} color="#059669" style={{marginTop: 2}}/>
                    <Text style={styles.whereText}>{law.whereToApply}</Text>
                </View>
            </>
            )}

            <Text style={styles.sectionTitle}>Tempi Previsti</Text>
            <View style={styles.durationBox}>
                <Ionicons name="time-outline" size={22} color="#ea580c" style={{marginTop: 2}}/>
                <Text style={styles.durationText}>{law.duration}</Text>
            </View>
        </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerArea: { padding: 20, paddingTop: 24 },
  contentPadding: { paddingHorizontal: 20 },
  bannerNewLayer: { flexDirection: 'row', backgroundColor: '#ef4444', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, marginBottom: 12, alignItems: 'center' },
  bannerNewText: { color: '#fff', fontSize: 10, fontWeight: '800', marginLeft: 4, letterSpacing: 0.5 },
  titleContainer: { borderBottomWidth: 3, borderBottomColor: '#0f4c81', alignSelf: 'flex-start', paddingBottom: 4, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f4c81', lineHeight: 28 }, 
  refBox: { flexDirection: 'row', backgroundColor: '#e0f2fe', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#0369a1' },
  refText: { color: '#0369a1', fontWeight: '700', marginLeft: 10, fontSize: 14, flexShrink: 1, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginTop: 16, marginBottom: 10 }, 
  paragraph: { fontSize: 16, color: '#334155', lineHeight: 24, fontWeight: '500', marginBottom: 20 },
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  bulletPoint: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#0ea5e9', marginTop: 9, marginRight: 12 },
  paragraphBullet: { fontSize: 16, color: '#334155', lineHeight: 24, fontWeight: '400', flexShrink: 1 },
  durationBox: { flexDirection: 'row', backgroundColor: '#f0f9ff', padding: 16, borderRadius: 12, alignItems: 'flex-start', borderLeftWidth: 4, borderLeftColor: '#0ea5e9', marginBottom: 20 },
  durationText: { color: '#0369a1', fontWeight: '600', marginLeft: 12, fontSize: 15, flexShrink: 1, lineHeight: 22 },
  whereBox: { flexDirection: 'row', backgroundColor: '#ecfdf5', padding: 16, borderRadius: 12, alignItems: 'flex-start', borderLeftWidth: 4, borderLeftColor: '#10b981', marginBottom: 20 },
  whereText: { color: '#047857', fontWeight: '600', marginLeft: 12, fontSize: 15, flexShrink: 1, lineHeight: 22 },
});
