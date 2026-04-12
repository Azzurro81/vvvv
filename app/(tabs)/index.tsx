import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { MOCK_FESTIVALS } from '../../constants/festivals';
import { hasAnyUnreadNews as hasAsiloNews } from '../../constants/asylum_laws';
import { hasAnyUnreadNews as hasWorkNews } from '../../constants/work_laws';
import { hasAnyUnreadNews as hasFamilyNews } from '../../constants/family_laws';
import { hasAnyUnreadNews as hasCitizenshipNews } from '../../constants/citizenship_laws';
import { hasAnyUnreadNews as hasResidenceNews } from '../../constants/residence_laws';
import { hasAnyUnreadNews as hasLongTermNews } from '../../constants/long_term_laws';

const HOME_SERVICES = [
  { id: 'asilo', title: 'Asilo', img: require('../../assets/images/asilo.png'), route: '/asilo' },
  { id: 'permesso', title: 'Permesso\ndi Soggiorno', img: require('../../assets/images/permesso.png'), route: '/permesso' },
  { id: 'carta', title: 'Carta\ndi Soggiorno', img: require('../../assets/images/carta.png'), route: '/carta' },
  { id: 'cittadinanza', title: 'Cittadinanza', img: require('../../assets/images/cittadinanza.png'), route: '/cittadinanza' },
  { id: 'famiglia', title: 'Famiglia', img: require('../../assets/images/famiglia.png'), route: '/famiglia' }
];

const MOCK_NEWS = [
  { id: '1', title: 'Sanatoria 2026: Pubblicate le circolari attuative del Ministero', date: 'Oggi, 10:30', category: 'LEGALE' },
  { id: '2', title: 'Decreto Flussi: Quote residue per lavoro subordinato', date: 'Ieri, 15:45', category: 'LAVORO' },
  { id: '3', title: 'Nuovo portale Cittadinanza: istruzioni per lo SPID', date: '10 Apr 2026', category: 'CITTADINANZA' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [displayFestivals, setDisplayFestivals] = useState<any[]>([]);
  const [unreads, setUnreads] = useState<Record<string, boolean>>({});

  useFocusEffect(
    useCallback(() => {
      setUnreads({
        asilo: hasAsiloNews(),
        famiglia: hasFamilyNews(),
        cittadinanza: hasCitizenshipNews(),
        permesso: hasResidenceNews(),
        carta: hasLongTermNews()
      });
    }, [])
  );

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validInt: any[] = [];
    const validIta: any[] = [];

    MOCK_FESTIVALS.forEach(fest => {
      const festDate = new Date(fest.date);
      
      if (festDate >= today) {
        const diffTime = festDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let timeString = '';
        if (diffDays === 0) {
           timeString = 'Oggi!';
        } else if (diffDays === 1) {
           timeString = 'Domani';
        } else {
           const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
           timeString = festDate.toLocaleDateString('it-IT', options);
        }

        const enrichedFest = { ...fest, diffDays, timeString };

        if (fest.country === 'Italia') {
          validIta.push(enrichedFest);
        } else {
          validInt.push(enrichedFest);
        }
      }
    });

    validInt.sort((a, b) => a.diffDays - b.diffDays);
    validIta.sort((a, b) => a.diffDays - b.diffDays);
    
    const topInt = validInt.slice(0, 4);
    const topIta = validIta.slice(0, 1)[0]; 

    const finalArray: any[] = [];
    if (topInt[0]) finalArray.push(topInt[0]);
    if (topInt[1]) finalArray.push(topInt[1]);
    if (topIta) finalArray.push({ ...topIta, isItalian: true });
    if (topInt[2]) finalArray.push(topInt[2]);
    if (topInt[3]) finalArray.push(topInt[3]);

    setDisplayFestivals(finalArray);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f4c81" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>InfoStranieri</Text>
        <TouchableOpacity style={styles.langSelector}>
          <Ionicons name="globe-outline" size={20} color="#fff" />
          <Text style={styles.langText}>IT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.sectionTitle, { paddingTop: 24, paddingHorizontal: 20 }]}>Le prossime Feste nel Mondo</Text>
        
        {/* I 5 PALLINI 3D MICROSCOPICI (60%) */}
        <View style={styles.bubblesContainer}>
          {displayFestivals.map((fest, index) => {
            const isCenter = fest.isItalian;
            return (
              <TouchableOpacity 
                key={`${fest.id}-${index}`} 
                style={[styles.bubbleItem, isCenter && styles.bubbleItemLarge]}
                onPress={() => router.push({ pathname: '/festival/[id]', params: { id: fest.id } })}
              >
                {/* Nome del paese SOPRA la bandiera */}
                <Text style={[styles.bubbleCountryName, isCenter && styles.bubbleCountryNameLarge]} numberOfLines={1}>
                  {fest.country}
                </Text>

                <View style={[styles.marbleShadow, isCenter && styles.marbleShadowLarge]}>
                  <View style={[styles.marbleGlass, isCenter && styles.marbleGlassLarge]}>
                    {/* resizeMethod="resize" forza React Native a massimizzare la resa della risoluzione */}
                    <Image source={{ uri: fest.flagUrl }} style={styles.bubbleCircle} resizeMethod="resize" />
                    {/* Riflesso luce superiore */}
                    <View style={styles.glassHighlightTop} />
                  </View>
                </View>
                
                {/* Testi Festa/Data inferiori */}
                <Text style={[styles.bubbleFestName, isCenter && styles.bubbleFestNameLarge]} numberOfLines={1}>{fest.name}</Text>
                <Text style={styles.bubbleFestDate} numberOfLines={1}>{fest.timeString}</Text>
              </TouchableOpacity>
            )
          })}
          {displayFestivals.length === 0 && (
             <Text style={{color: '#94a3b8', fontStyle: 'italic'}}>Nessuna festa trovata.</Text>
          )}
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Categorie Grid */}
          <Text style={styles.sectionTitle}>Servizi e guide</Text>
          <View style={styles.grid}>
            {HOME_SERVICES.map(svc => (
              <TouchableOpacity key={svc.id} style={styles.card} onPress={() => (router.push as any)(svc.route)}>
                {unreads[svc.id] && (
                  <View style={styles.badgeHomeAsilo}>
                    <Text style={styles.badgeHomeAsiloText}>NOVITÀ</Text>
                  </View>
                )}
                <View style={styles.cardImageContainer}>
                  <Image 
                    source={svc.img} 
                    style={[
                      styles.cardImage, 
                      (svc.id === 'permesso' || svc.id === 'carta') && { transform: [{ scale: 1.6 }] }
                    ]} 
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{svc.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Novità */}
          <View style={styles.newsHeader}>
            <Text style={styles.sectionTitle}>Ultime Novità</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Vedi tutte</Text></TouchableOpacity>
          </View>
          
          {MOCK_NEWS.map(news => (
            <TouchableOpacity key={news.id} style={styles.newsItem}>
                <View style={styles.newsContent}>
                    <View style={styles.newsTag}>
                      <Text style={styles.newsTagText}>{news.category}</Text>
                    </View>
                    <Text style={styles.newsTitle}>{news.title}</Text>
                    <Text style={styles.newsDate}>{news.date}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f4c81' },
  header: { backgroundColor: '#0f4c81', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '700', letterSpacing: 0.5 },
  langSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  langText: { color: '#fff', fontWeight: '600', marginLeft: 6, fontSize: 14 },
  
  body: { flex: 1, backgroundColor: '#f8fafc', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0f4c81', marginBottom: 14 },
  
  /* STILI BULLE/SFERE */
  bubblesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  bubbleItem: {
    alignItems: 'center',
    marginHorizontal: 1, 
    width: 62, 
  },
  bubbleItemLarge: {
    width: 72, 
  },
  bubbleCountryName: {
    fontSize: 9,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  bubbleCountryNameLarge: {
    fontSize: 10,
    color: '#0f4c81',
  },
  marbleShadow: {
    width: 36, // Accorciate al 60% come richiesto
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    marginBottom: 4,
  },
  marbleShadowLarge: {
    width: 46, // Italia bilanciata per essere più grande ma non invadente
    height: 46,
    borderRadius: 23,
  },
  marbleGlass: {
    width: '100%',
    height: '100%',
    borderRadius: 100, 
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e2e8f0', 
  },
  marbleGlassLarge: {
    // Italia senza bordo extra
  },
  bubbleCircle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  glassHighlightTop: {
    position: 'absolute',
    top: 2,
    left: '15%',
    width: '70%',
    height: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.45)', 
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  bubbleFestName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 1,
  },
  bubbleFestNameLarge: {
    fontSize: 11,
    color: '#0f4c81', 
  },
  bubbleFestDate: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ea580c', // Colore Arancione
    textAlign: 'center',
  },

  /* ALTRI STILI HOMESCREEN */
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  badgeHomeAsilo: { position: 'absolute', top: -8, right: -6, backgroundColor: '#ef4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, elevation: 4, zIndex: 10 },
  badgeHomeAsiloText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 8, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardImageContainer: { height: 95, width: '100%', marginBottom: 4, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  cardImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  cardTextContainer: { alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: '#334155', fontSize: 13, fontWeight: '700', textAlign: 'center', lineHeight: 18 },
  
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 14, fontWeight: '700', color: '#0ea5e9' },
  newsItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, elevation: 1 },
  newsContent: { flex: 1, paddingRight: 10 },
  newsTag: { backgroundColor: '#f0f9ff', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 6 },
  newsTagText: { fontSize: 9, fontWeight: '800', color: '#0369a1', letterSpacing: 0.5 },
  newsTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 4, lineHeight: 20 },
  newsDate: { fontSize: 12, color: '#94a3b8', fontWeight: '600' }
});
