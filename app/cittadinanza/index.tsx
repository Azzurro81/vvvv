import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CITIZENSHIP_CATEGORIES } from '../../constants/citizenship_laws';

export default function CittadinanzaFoldersScreen() {
    const router = useRouter();
    const [cats] = useState(CITIZENSHIP_CATEGORIES);
    const [, setUpdater] = useState(0);

    useFocusEffect(useCallback(() => {
        setUpdater(Date.now());
    }, []));

    return (
       <ScrollView style={styles.container} contentContainerStyle={styles.listContent}>
           <Text style={styles.sectionTitle}>Scegli il percorso di cittadinanza</Text>
           <View style={styles.grid}>
              {cats.map(cat => {
                 return (
                    <TouchableOpacity 
                       key={cat.id} 
                       style={styles.card} 
                       onPress={() => (router.push as any)(`/cittadinanza/category/${cat.id}`)}
                    >
                       <Ionicons name={cat.icon as any} size={32} color="#0f4c81" style={styles.cardIcon} />
                       <Text style={styles.cardTitle}>{cat.name}</Text>
                    </TouchableOpacity>
                 )
              })}
           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  listContent: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f4c81', marginBottom: 24, textAlign: 'center', letterSpacing: 0.3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
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
  cardTitle: { color: '#1e293b', fontSize: 13, fontWeight: '800', textAlign: 'center', lineHeight: 18 }
});
