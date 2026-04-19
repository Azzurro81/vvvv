import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SUPPORTED_LANGUAGES } from '../services/translationService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TranslationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectLanguage: (langCode: string) => void;
  currentLanguage: string;
}

export default function TranslationModal({ isVisible, onClose, onSelectLanguage, currentLanguage }: TranslationModalProps) {
  // Raggruppa le lingue per gruppo
  const groups: Record<string, typeof SUPPORTED_LANGUAGES> = {};
  SUPPORTED_LANGUAGES.forEach(lang => {
    const group = lang.group || 'Altro';
    if (!groups[group]) groups[group] = [];
    groups[group].push(lang);
  });

  const groupOrder = ['Base', 'Africa / Medio Oriente', 'Africa', 'Asia', 'Medio Oriente', 'Asia Centrale', 'America', 'Internazionale'];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Header Blu */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>🌍 Traduci</Text>
              <Text style={styles.headerSubtitle}>Scegli la tua lingua</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {groupOrder.map(groupName => {
              const langs = groups[groupName];
              if (!langs || langs.length === 0) return null;

              return (
                <View key={groupName}>
                  {/* Intestazione Gruppo */}
                  {groupName !== 'Base' && (
                    <View style={styles.groupHeader}>
                      <Text style={styles.groupTitle}>{groupName.toUpperCase()}</Text>
                      <View style={styles.groupLine} />
                    </View>
                  )}

                  {/* Lista Lingue */}
                  {langs.map((lang) => {
                    const isActive = currentLanguage === lang.code;
                    return (
                      <TouchableOpacity
                        key={lang.code}
                        style={[styles.langRow, isActive && styles.langRowActive]}
                        onPress={() => {
                          onSelectLanguage(lang.code);
                          onClose();
                        }}
                      >
                        <View style={styles.langLeft}>
                          <Text style={styles.flag}>{lang.flag}</Text>
                          <View style={styles.langTextContainer}>
                            <Text style={[styles.langNative, isActive && styles.langNativeActive]}>
                              {lang.native}
                            </Text>
                            <Text style={styles.langName}>{lang.name}</Text>
                          </View>
                        </View>
                        {isActive && (
                          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: SCREEN_HEIGHT * 0.85,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 28,
    backgroundColor: '#0f4c81',
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 2,
    marginRight: 12,
  },
  groupLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginVertical: 3,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  langRowActive: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
    borderWidth: 2.5,
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 34,
    marginRight: 16,
  },
  langTextContainer: {
    flex: 1,
  },
  langNative: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0.5,
  },
  langNativeActive: {
    color: '#047857',
    fontWeight: '900',
  },
  langName: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
