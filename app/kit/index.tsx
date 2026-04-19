import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { KIT_GUIDES, isGuideUnread } from '../../constants/kit_guides';

export default function KitScreen() {
    const router = useRouter();
    const [guides] = useState(KIT_GUIDES);
    const [, setUpdater] = useState(0);

    useFocusEffect(useCallback(() => {
        setUpdater(Date.now());
    }, []));

    return (
       <ScrollView style={styles.container} contentContainerStyle={styles.listContent}>
           {/* Custom back button area since we removed headers */}
           <View style={styles.headerArea}>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="#0f4c81" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Compilazione Kit</Text>
              <View style={{width: 40}} /> 
           </View>

           <Text style={styles.sectionTitle}>Scegli la guida per il Kit</Text>
           <View style={styles.grid}>
              {guides.map(guide => {
                 const hasNovelty = isGuideUnread(guide.id, guide.isNew);
                 return (
                    <TouchableOpacity 
                       key={guide.id} 
                       style={styles.card} 
                       onPress={() => (router.push as any)(`/kit/${guide.id}`)}
                    >
                       {hasNovelty && (
                          <View style={styles.badgeNew}>
                             <Text style={styles.badgeText}>NUOVO</Text>
                          </View>
                       )}
                       <Ionicons name="document-text-outline" size={32} color="#0f4c81" style={styles.cardIcon} />
                       <Text style={styles.cardTitle}>{guide.title}</Text>
                    </TouchableOpacity>
                 )
              })}
           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  headerArea: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b' },
  listContent: { paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#64748b', marginBottom: 24, textAlign: 'center', letterSpacing: 0.3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  card: { 
    width: '48%', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderBottomWidth: 4,
    borderBottomColor: '#0f4c81',
    shadowColor: '#0f4c81', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 10, 
    elevation: 3 
  },
  cardIcon: { marginBottom: 14 },
  cardTitle: { color: '#1e293b', fontSize: 13, fontWeight: '800', textAlign: 'center', lineHeight: 18 },
  badgeNew: { position: 'absolute', top: -10, right: -6, backgroundColor: '#ef4444', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, zIndex: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, elevation: 5 },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
});
