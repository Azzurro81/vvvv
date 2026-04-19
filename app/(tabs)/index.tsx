import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { MOCK_FESTIVALS } from '../../constants/festivals';
import { hasAnyUnreadNews as hasAsiloNews } from '../../constants/asylum_laws';
import { hasAnyUnreadNews as hasFamilyNews } from '../../constants/family_laws';
import { hasAnyUnreadNews as hasCitizenshipNews } from '../../constants/citizenship_laws';
import { hasAnyUnreadNews as hasResidenceNews } from '../../constants/residence_laws';
import { hasAnyUnreadNews as hasLongTermNews } from '../../constants/long_term_laws';
import { hasAnyUnreadNews as hasDisabledNews } from '../../constants/disabled_laws';
import { hasAnyUnreadNews as hasDigitalNews } from '../../constants/digital_laws';
import { hasAnyUnreadNews as hasSanitaNews } from '../../constants/sanita_laws';
import { hasAnyUnreadNews as hasBonusNews } from '../../constants/bonus_laws';

const HOME_SERVICES = [
  { id: 'asilo', title: 'Asilo', img: require('../../assets/images/asilo.png'), route: '/asilo' },
  { id: 'permesso', title: 'Permesso\ndi Soggiorno', img: require('../../assets/images/permesso.png'), route: '/permesso' },
  { id: 'carta', title: 'Carta\ndi Soggiorno', img: require('../../assets/images/carta.png'), route: '/carta' },
  { id: 'cittadinanza', title: 'Cittadinanza', img: require('../../assets/images/cittadinanza.png'), route: '/cittadinanza' },
  { id: 'famiglia', title: 'Famiglia', img: require('../../assets/images/famiglia.png'), route: '/famiglia' },
  { id: 'bonus', title: 'Bonus', img: require('../../assets/images/bonus.png'), route: '/bonus' },
  { id: 'digital', title: 'Burocrazia\ndigitale', img: require('../../assets/images/digitale.png'), route: '/digital' },
  { id: 'sanita', title: 'Sanità', img: require('../../assets/images/sanita.png'), route: '/sanita' },
  { id: 'disabili', title: 'Disabili', img: require('../../assets/images/disabili.png'), route: '/disabili' },
  { id: 'kit', title: 'Compilazione\nKit', img: require('../../assets/images/kit.png'), route: '/kit' }
];

const MOCK_NEWS = [
  { id: '1', title: 'Sanatoria 2026: Pubblicate le circolari attuative del Ministero', date: 'Oggi, 10:30', category: 'LEGALE' },
  { id: '2', title: 'Decreto Flussi: Quote residue per lavoro subordinato', date: 'Ieri, 15:45', category: 'LAVORO' },
  { id: '3', title: 'Nuovo portale Cittadinanza: istruzioni per lo SPID', date: '10 Apr 2026', category: 'CITTADINANZA' },
];

import { useAuth } from '../../context/AuthContext';
import { useDrawer } from './_layout';
import { useLanguage } from '../../context/LanguageContext';
import TranslationModal from '../../components/TranslationModal';

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const { isGuest, daysRemaining, user } = useAuth();
  const { language, setLanguage, t, translateAsync, isTranslating } = useLanguage();
  const [displayFestivals, setDisplayFestivals] = useState<any[]>([]);
  const [unreads, setUnreads] = useState<Record<string, boolean>>({});
  const [annunciVisible, setAnnunciVisible] = useState(false);
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  // Traduci i testi della Home quando cambia la lingua
  useEffect(() => {
    if (language === 'it') return;
    const textsToTranslate = [
      // Titoli dei servizi
      ...HOME_SERVICES.map(s => s.title),
      // News
      ...MOCK_NEWS.map(n => n.title),
      ...MOCK_NEWS.map(n => n.category),
      // Labels
      'Prossime Feste nel Mondo',
      'Ultime Novità',
      'Vedi tutte',
      'NOVITÀ',
      'Nessuna festa trovata.',
      'Menu',
      'Altro',
      'Scegli la lingua',
      'Offerte di lavoro',
      'Cerco lavoro',
      'Chat tra utenti',
    ];
    translateAsync(textsToTranslate);
  }, [language]);

  useFocusEffect(
    useCallback(() => {
      setUnreads({
        asilo: hasAsiloNews(),
        famiglia: hasFamilyNews(),
        bonus: hasBonusNews(),
        cittadinanza: hasCitizenshipNews(),
        permesso: hasResidenceNews(),
        carta: hasLongTermNews(),
        disabili: hasDisabledNews(),
        digital: hasDigitalNews(),
        sanita: hasSanitaNews()
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
    
    const slots = new Array(5).fill(null);
    if (validIta.length > 0) {
      slots[2] = { ...validIta[0], isItalian: true };
    }
    let intPointer = 0;
    for (let i = 0; i < 5; i++) {
       if (i === 2) continue;
       if (intPointer < validInt.length) {
         slots[i] = validInt[intPointer++];
       }
    }
    const finalArray = slots.filter(s => s !== null);
    setDisplayFestivals(finalArray);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f4c81" />
      
      <View style={styles.header}>
        {/* Sfondo Bandiera Italiana (Absolute) */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#008C45' }} />
          <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
          <View style={{ flex: 1, backgroundColor: '#CD212A' }} />
        </View>

        <View style={{ width: 60 }} />

        <View style={{ flex: 1, alignItems: 'center', zIndex: 2 }}>
          <Text style={styles.headerTitle}>Benvenuti in InfoStranieri</Text>
          {user && <Text style={styles.welcomeUser}>Ciao, {user.name}</Text>}
        </View>

        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={true}>
        
        <View style={{ position: 'relative', paddingHorizontal: 20, paddingTop: 66, paddingBottom: 10 }}>
          <TouchableOpacity 
            style={{ position: 'absolute', left: 12, top: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10 }} 
            onPress={openDrawer}
          >
            <Ionicons name="menu" size={28} color="#0f4c81" />
            <Text style={{ color: '#0f4c81', fontSize: 16, fontWeight: '900', marginLeft: 4, textTransform: 'uppercase' }}>{t('Menu')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ position: 'absolute', right: 12, top: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10 }} 
            onPress={() => setAnnunciVisible(true)}
          >
            <Text style={{ color: '#0f4c81', fontSize: 16, fontWeight: '900', marginRight: 4, textTransform: 'uppercase' }}>{t('Altro')}</Text>
            <Ionicons name="add-circle" size={28} color="#0f4c81" />
          </TouchableOpacity>

          <View style={{ position: 'absolute', top: 20, left: 0, right: 0, alignItems: 'center', zIndex: 5 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setIsLangModalVisible(true)}>
              <Text style={{ color: '#ef4444', fontSize: 9, fontWeight: '800', marginRight: 4, textTransform: 'uppercase' }}>{t('Scegli la lingua')}</Text>
              <Ionicons name="globe-outline" size={20} color="#0f4c81" />
              <Text style={{ color: '#0f4c81', fontWeight: '900', marginLeft: 2, fontSize: 14 }}>{language.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.sectionTitle, { fontSize: 17, fontWeight: '900', marginBottom: 0, color: '#0f4c81', textAlign: 'center' }]}>{t('Prossime Feste nel Mondo')}</Text>
        </View>
        
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
                
                <View style={[styles.dateBadge, isCenter && styles.dateBadgeLarge]}>
                  <Text style={[styles.bubbleFestDate, isCenter && styles.bubbleFestDateLarge]}>{fest.timeString}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
          {displayFestivals.length === 0 && (
             <Text style={{color: '#94a3b8', fontStyle: 'italic'}}>{t('Nessuna festa trovata.')}</Text>
          )}
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Categorie Grid */}
          <View style={styles.grid}>
            {HOME_SERVICES.map(svc => (
              <TouchableOpacity key={svc.id} style={styles.card} onPress={() => (router.push as any)(svc.route)}>
                {unreads[svc.id] && (
                  <View style={styles.badgeHomeAsilo}>
                    <Text style={styles.badgeHomeAsiloText}>{t('NOVITÀ')}</Text>
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
                  <Text style={styles.cardTitle}>{t(svc.title)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Novità */}
          <View style={styles.newsHeader}>
            <Text style={styles.sectionTitle}>{t('Ultime Novità')}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>{t('Vedi tutte')}</Text></TouchableOpacity>
          </View>
          
          {MOCK_NEWS.map(news => (
            <TouchableOpacity key={news.id} style={styles.newsItem}>
                <View style={styles.newsContent}>
                    <View style={styles.newsTag}>
                      <Text style={styles.newsTagText}>{t(news.category)}</Text>
                    </View>
                    <Text style={styles.newsTitle}>{t(news.title)}</Text>
                    <Text style={styles.newsDate}>{news.date}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <Modal visible={annunciVisible} animationType="fade" transparent={true} onRequestClose={() => setAnnunciVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', width: '75%', height: '100%' }}>
            
            {/* Header Blu a Specchio */}
            <View style={{ padding: 20, paddingTop: 30, paddingBottom: 16, backgroundColor: '#0f4c81', borderBottomLeftRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: '#ffffff', letterSpacing: 2 }}>ALTRO</Text>
              <TouchableOpacity onPress={() => setAnnunciVisible(false)}>
                <Ionicons name="close" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Contenuto Bottoni */}
            <View style={{ padding: 24, paddingTop: 30 }}>
              <TouchableOpacity style={styles.modalOption} onPress={() => setAnnunciVisible(false)}>
                <Ionicons name="briefcase" size={24} color="#0ea5e9" />
                <Text style={styles.modalOptionText}>{t('Offerte di lavoro')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={() => setAnnunciVisible(false)}>
                <Ionicons name="search" size={24} color="#10b981" />
                <Text style={styles.modalOptionText}>{t('Cerco lavoro')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={() => setAnnunciVisible(false)}>
                <Ionicons name="chatbubbles" size={24} color="#8b5cf6" />
                <Text style={styles.modalOptionText}>{t('Chat tra utenti')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={() => { setAnnunciVisible(false); router.push('/reminders'); }}>
                <Ionicons name="call" size={24} color="#f59e0b" />
                <Text style={styles.modalOptionText}>{t('Promemoria con chiamata')}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <TranslationModal
        isVisible={isLangModalVisible}
        onClose={() => setIsLangModalVisible(false)}
        onSelectLanguage={setLanguage}
        currentLanguage={language}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#008C45' }, // Set SafeArea to match the green of the flag
  header: { overflow: 'hidden', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 28, paddingBottom: 8 },
  headerTitle: { color: '#0f4c81', fontSize: 26, fontWeight: '900', letterSpacing: 0.5, textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  welcomeUser: { color: '#0f4c81', fontSize: 14, fontWeight: '800', marginTop: -2 },
  menuButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  menuButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  langSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f4c81', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1 },
  langText: { color: '#fff', fontWeight: '600', marginLeft: 6, fontSize: 14 },
  modalOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  modalOptionText: { fontSize: 16, fontWeight: '700', color: '#334155', marginLeft: 12 },
  
  body: { flex: 1, backgroundColor: '#f8fafc', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  trialBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#e0f2fe', 
    margin: 16, 
    marginBottom: 0,
    padding: 12, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd'
  },
  trialBannerText: { color: '#0369a1', fontSize: 14, fontWeight: '500', marginLeft: 8 },
  daysBold: { fontWeight: '800', color: '#0369a1' },
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
    fontSize: 8,
    fontWeight: '700',
    color: '#64748b', // Più scuro (da #94a3b8)
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  bubbleCountryNameLarge: {
    fontSize: 9,
    color: '#0a3d66', // Blu più profondo (da #0f4c81)
    fontWeight: '800',
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
    fontSize: 9,
    fontWeight: '600',
    color: '#334155', // Più scuro (da #64748b)
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 11,
  },
  bubbleFestNameLarge: {
    fontSize: 10,
    color: '#0f172a', // Quasi nero (da #1e293b)
    fontWeight: '700',
  },
  dateBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cbd5e1', // Bordo più visibile
  },
  dateBadgeLarge: {
    backgroundColor: '#d0e8f7', // Fondo leggermente più saturo
    borderColor: '#0369a1',
    paddingHorizontal: 8,
  },
  bubbleFestDate: {
    fontSize: 9,
    fontWeight: '800',
    color: '#334155', // Più scuro (da #64748b)
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  bubbleFestDateLarge: {
    color: '#075985', // Blu più scuro (da #0369a1)
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
