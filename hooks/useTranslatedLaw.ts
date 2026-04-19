import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translateLaw } from '../services/translationService';

/**
 * Custom hook to handle real-time translation of a law object.
 * Returns the translated law, a loading state, and any errors.
 */
export function useTranslatedLaw(initialLaw: any) {
  const { language } = useLanguage();
  const [translatedLaw, setTranslatedLaw] = useState(initialLaw);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function performTranslation() {
      // If language is Italian, use original data immediately
      if (language === 'it') {
        setTranslatedLaw(initialLaw);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await translateLaw(initialLaw, language);
        setTranslatedLaw(result);
      } catch (err) {
        console.error('Translation hook error:', err);
        setError('Errore durante la traduzione. Verrà mostrato il testo originale.');
        setTranslatedLaw(initialLaw);
      } finally {
        setIsLoading(false);
      }
    }

    performTranslation();
  }, [language, initialLaw]);

  return { translatedLaw, isLoading, error };
}
