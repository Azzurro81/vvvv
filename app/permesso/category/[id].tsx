import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RESIDENCE_CATEGORIES, RESIDENCE_LAWS, isLawUnread } from '../../../constants/residence_laws';

export default function PermessoCategoryLawsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [, setUpdater] = useState(0);

  useFocusEffect(useCallback(() => {
     setUpdater(Date.now());
  }, []));

  const category = RESIDENCE_CATEGORIES.find(c => c.id === id);
  const laws = RESIDENCE_LAWS.filter(l => l.categoryId === id);

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
                  onPress={() => (router.push as any)(`/permesso/law/${item.id}`)}
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
             <Text style={styles.emptyText}>Nessuna guida disponibile per questa categoria.</Text>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  lawCard: { 
    backgroundColor: '#fff', 
    borderRadius: 14, 
    padding: 18, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderLeftWidth: 5,
    borderLeftColor: '#cbd5e1', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.04, 
    shadowRadius: 5, 
    elevation: 2 
  },
  lawCardUnread: { backgroundColor: '#f0f9ff', borderLeftColor: '#0ea5e9', borderColor: '#bae6fd' },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  badgeNew: { backgroundColor: '#ef4444', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginRight: 10, alignSelf: 'flex-start', marginTop: 2 },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  lawTitle: { fontSize: 17, fontWeight: '800', color: '#1e293b', flex: 1, lineHeight: 22 },
  lawTitleUnread: { color: '#0369a1' },
  lawReference: { fontSize: 13, color: '#64748b', fontWeight: '700', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  lawDesc: { fontSize: 14, color: '#475569', lineHeight: 20, fontWeight: '400' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 14 },
  dateText: { fontSize: 12, color: '#94a3b8', fontWeight: '700' },
  emptyText: { textAlign: 'center', marginTop: 60, color: '#94a3b8', fontSize: 16, fontWeight: '500' }
});
