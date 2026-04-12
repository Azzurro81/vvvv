import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_FESTIVALS } from '../../constants/festivals';

export default function FestivalDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const festival = MOCK_FESTIVALS.find(f => f.id === id);

  if (!festival) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Festival non trovato.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonError}>
          <Text style={styles.backButtonErrorText}>Torna alla Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate detailed date formatting
  const festDate = new Date(festival.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = festDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let timeString = '';
  if (diffDays === 0) {
    timeString = 'Oggi!';
  } else if (diffDays === 1) {
    timeString = 'Domani';
  } else {
    timeString = festDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#0f4c81" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{festival.country}</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Cover Video/Image */}
        <View style={styles.imageContainer}>
           <Image source={{ uri: festival.imageUrl }} style={styles.coverImage} />
           <View style={styles.flagBadge}>
              <Image source={{ uri: festival.flagUrl }} style={styles.flagIcon} />
           </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{festival.name}</Text>
          
          <View style={styles.dateBadge}>
             <Ionicons name="calendar" size={16} color="#0ea5e9" style={{ marginRight: 6 }} />
             <Text style={styles.dateText}>{timeString}</Text>
          </View>
          
          <Text style={styles.sectionHeading}>Cos'è questa festa?</Text>
          <Text style={styles.description}>{festival.description}</Text>

          {/* Useful Notice */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={26} color="#0f4c81" style={{ marginRight: 12, marginTop: 2 }} />
            <Text style={styles.infoText}>Le ambasciate e i consolati dell'area geografica potrebbero subire variazioni d'orario durante questa festività. Verifica in anticipo eventuali appuntamenti presi in Italia.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f4c81', 
  },
  header: {
    backgroundColor: '#0f4c81',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flagBadge: {
    position: 'absolute',
    bottom: -20,
    right: 24,
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  flagIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f4c81',
    marginBottom: 16,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0ea5e9',
    textTransform: 'capitalize',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 20,
  },
  backButtonError: {
    backgroundColor: '#0f4c81',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonErrorText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
