import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SIDEBAR_CATEGORIES = [
  { id: 'asilo', title: 'Asilo', route: '/asilo', icon: 'globe' },
  { id: 'permesso', title: 'Permesso di Soggiorno', route: '/permesso', icon: 'document' },
  { id: 'carta', title: 'Carta di Soggiorno', route: '/carta', icon: 'card' },
  { id: 'cittadinanza', title: 'Cittadinanza', route: '/cittadinanza', icon: 'flag' },
  { id: 'famiglia', title: 'Famiglia', route: '/famiglia', icon: 'people' },
  { id: 'bonus', title: 'Bonus', route: '/bonus', icon: 'cash' },
  { id: 'digital', title: 'Burocrazia Digitale', route: '/digital', icon: 'laptop' },
  { id: 'sanita', title: 'Sanità', route: '/sanita', icon: 'medkit' },
  { id: 'lavoro', title: 'Lavoro', route: '/lavoro', icon: 'briefcase' },
  { id: 'disabili', title: 'Disabili', route: '/disabili', icon: 'body' },
  { id: 'kit', title: 'Compilazione Kit', route: '/kit', icon: 'document-text' },
];

export function SidebarContent() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuTitle}>MENU</Text>
        <View style={styles.divider} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {SIDEBAR_CATEGORIES.map((cat, index) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.item}
            onPress={() => handleNavigate(cat.route)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Ionicons name={cat.icon as any} size={24} color="#0f4c81" />
               <Text style={styles.itemText}>{cat.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>InfoStranieri 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingTop: 30, paddingBottom: 16, backgroundColor: '#0f4c81', borderBottomRightRadius: 24 },
  menuTitle: { fontSize: 28, fontWeight: '900', color: '#ffffff', letterSpacing: 2 },
  divider: { height: 3, backgroundColor: '#ffffff', width: 40, marginTop: 10 },
  scrollView: { flex: 1 },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
  },
  itemText: { fontSize: 16, fontWeight: '700', color: '#111827', marginLeft: 12 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  footerText: { textAlign: 'center', color: '#cbd5e1', fontSize: 12, fontWeight: '700' }
});
