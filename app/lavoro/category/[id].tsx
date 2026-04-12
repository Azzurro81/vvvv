import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WORK_CATEGORIES, WORK_LAWS, isLawUnread } from '../../../constants/work_laws';

export default function LavoroCategoryLawsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [, setUpdater] = useState(0);

  useFocusEffect(useCallback(() => {
     setUpdater(Date.now());
  }, []));

  const category = WORK_CATEGORIES.find(c => c.id === id);
  const laws = WORK_LAWS.filter(l => l.categoryId === id);

  if (!category) return null;

  return (
    <>
      <Stack.Screen options={{ title: category.name }} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={laws}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
             const unread = isLawUnread(item.id, item.isNew);
             return (
               <TouchableOpacity 
                  style={[styles.lawCard, unread ? styles.lawCardUnread : null]}
                  onPress={() => (router.push as any)(`/lavoro/law/${item.id}`)}
               >
                  <View style={styles.cardHeader}>
                     {item.isNew && unread && (
                        <View style={styles.badgeNew}>
                           <Text style={styles.badgeText}>NOVITÀ</Text>
                        </View>
                     )}
                     <Text style={[styles.lawTitle, unread ? styles.lawTitleUnread : null]}>{item.title}</Text>
                  </View>
                  <Text style={styles.lawReference} numberOfLines={1}>{item.lawReference}</Text>
                  <Text style={styles.lawDesc} numberOfLines={2}>{item.description}</Text>
                  <View style={styles.cardFooter}>
                     <Text style={styles.dateText}>{item.dateAdded.split('-').reverse().join('/')}</Text>
                     <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                  </View>
               </TouchableOpacity>
             )
          }}
          ListEmptyComponent={() => (
             <Text style={styles.emptyText}>Nessuna normativa disponibile.</Text>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  lawCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  lawCardUnread: { backgroundColor: '#f0f9ff', borderColor: '#bae6fd' },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  badgeNew: { backgroundColor: '#ef4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginRight: 8, alignSelf: 'flex-start', marginTop: 2 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  lawTitle: { fontSize: 16, fontWeight: '700', color: '#334155', flex: 1 },
  lawTitleUnread: { color: '#0369a1' },
  lawReference: { fontSize: 13, color: '#64748b', fontWeight: '500', marginBottom: 8 },
  lawDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  dateText: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748b', fontSize: 15 }
});
