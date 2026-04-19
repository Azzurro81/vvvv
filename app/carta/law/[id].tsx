import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { LONG_TERM_LAWS, markLawAsRead } from '../../../constants/long_term_laws';
import { Ionicons } from '@expo/vector-icons';
import DocumentAccordion from '../../../components/DocumentAccordion';

import { useTranslatedLaw } from '../../../hooks/useTranslatedLaw';

export default function CartaLawDetailScreen() {
  const { id } = useLocalSearchParams();
  const initialLaw = LONG_TERM_LAWS.find(l => l.id === id);
  const { translatedLaw: law, isLoading } = useTranslatedLaw(initialLaw);

  useEffect(() => {
    if (initialLaw && initialLaw.isNew) {
       markLawAsRead(initialLaw.id);
    }
  }, [initialLaw]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="sync" size={48} color="#0f4c81" />
        <Text style={styles.loadingText}>Traduzione in corso...</Text>
      </View>
    );
  }

  if (!law) {
    return <View style={styles.container}><Text style={{padding: 20}}>Dati non trovati</Text></View>;
  }

  const formattedDate = law.dateAdded ? law.dateAdded.split('-').reverse().join('/') : '';

  return (
    <>
      <Stack.Screen options={{ title: isLoading ? 'Caricamento...' : 'Dettaglio Carta UE' }} />
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
                <Ionicons name="card-outline" size={20} color="#0369a1" />
                <Text style={styles.refText}>{law.lawReference}</Text>
            </View>

            <Text style={styles.sectionTitle}>Descrizione Generale</Text>
            <Text style={styles.paragraph}>{law.description}</Text>
            
            <Text style={styles.sectionTitle}>Requisiti per l'Ottenimento</Text>
            {law.requirements.map((req: string, i: number) => (
            <View key={i} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.paragraphBullet}>{req}</Text>
            </View>
            ))}

            {law.documentsNeeded && (
            <>
                <Text style={styles.sectionTitle}>Documentazione</Text>
                {law.documentsNeeded.map((doc: string, i: number) => (
                    <DocumentAccordion key={i} documentName={doc} />
                ))}
            </>
            )}

            {law.whereToApply && (
            <>
                <Text style={styles.sectionTitle}>Canale di Richiesta</Text>
                <View style={styles.whereBox}>
                    <Ionicons name="location-outline" size={22} color="#059669" style={{marginTop: 2}}/>
                    <Text style={styles.whereText}>{law.whereToApply}</Text>
                </View>
            </>
            )}

            <Text style={styles.sectionTitle}>Validità</Text>
            <View style={styles.durationBox}>
                <Ionicons name="infinite-outline" size={22} color="#ea580c" style={{marginTop: 2}}/>
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
  center: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#0f4c81', fontWeight: '600' }
});
