import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { translateText } from '../services/translationService';

type TranslationCache = Record<string, Record<string, string>>;

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
  translateAsync: (texts: string[]) => Promise<void>;
  isTranslating: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('it');
  const [isTranslating, setIsTranslating] = useState(false);
  const [cache, setCache] = useState<TranslationCache>({});
  const pendingRef = useRef<Set<string>>(new Set());

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
  }, []);

  // Funzione sincrona: ritorna la traduzione se in cache, altrimenti il testo originale
  const t = useCallback((text: string): string => {
    if (!text || language === 'it') return text;
    return cache[language]?.[text] || text;
  }, [language, cache]);

  // Funzione asincrona: traduce un array di testi e li mette in cache
  const translateAsync = useCallback(async (texts: string[]) => {
    if (language === 'it') return;

    // Filtra solo i testi non ancora tradotti e non in corso
    const toTranslate = texts.filter(text => 
      text && 
      !cache[language]?.[text] && 
      !pendingRef.current.has(`${language}:${text}`)
    );

    if (toTranslate.length === 0) return;

    setIsTranslating(true);

    // Segna come in corso
    toTranslate.forEach(text => pendingRef.current.add(`${language}:${text}`));

    try {
      // Traduci in batch paralleli (max 10 alla volta per non sovraccaricare)
      const batchSize = 10;
      const newTranslations: Record<string, string> = {};

      for (let i = 0; i < toTranslate.length; i += batchSize) {
        const batch = toTranslate.slice(i, i + batchSize);
        const results = await Promise.all(
          batch.map(text => translateText(text, language))
        );
        batch.forEach((text, idx) => {
          newTranslations[text] = results[idx];
        });
      }

      setCache(prev => ({
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          ...newTranslations,
        },
      }));
    } catch (error) {
      console.error('Translation batch error:', error);
    } finally {
      toTranslate.forEach(text => pendingRef.current.delete(`${language}:${text}`));
      setIsTranslating(false);
    }
  }, [language, cache]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateAsync, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
