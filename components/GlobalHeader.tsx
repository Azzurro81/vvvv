import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';
import TranslationModal from './TranslationModal';

interface GlobalHeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function GlobalHeader({ title = 'InfoStranieri', showBack = false }: GlobalHeaderProps) {
  const router = useRouter();
  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#facc15" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.langSelector} 
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="globe-outline" size={20} color="#fff" />
          <Text style={styles.langText}>{language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <TranslationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectLanguage={setLanguage}
        currentLanguage={language}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0f4c81',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  langText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 6,
  },
});
