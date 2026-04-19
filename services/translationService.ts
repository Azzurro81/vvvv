/**
 * InfoStranieri Translation Service
 * Gestisce la traduzione dinamica dei testi tramite API.
 */

const GOOGLE_TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=';

export const SUPPORTED_LANGUAGES = [
  // Lingua base
  { code: 'it', name: 'Italiano', native: 'Italiano', flag: '🇮🇹', group: 'Base' },

  // 🌍 AFRICA
  { code: 'ar', name: 'Arabo', native: 'العربية', flag: '🇸🇦', group: 'Africa / Medio Oriente' },
  { code: 'am', name: 'Amarico', native: 'አማርኛ', flag: '🇪🇹', group: 'Africa' },
  { code: 'so', name: 'Somalo', native: 'Soomaali', flag: '🇸🇴', group: 'Africa' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇹🇿', group: 'Africa' },
  { code: 'ha', name: 'Hausa', native: 'Hausa', flag: '🇳🇬', group: 'Africa' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬', group: 'Africa' },
  { code: 'ig', name: 'Igbo', native: 'Igbo', flag: '🇳🇬', group: 'Africa' },
  { code: 'wo', name: 'Wolof', native: 'Wolof', flag: '🇸🇳', group: 'Africa' },
  { code: 'ti', name: 'Tigrino', native: 'ትግርኛ', flag: '🇪🇷', group: 'Africa' },
  { code: 'mg', name: 'Malgascio', native: 'Malagasy', flag: '🇲🇬', group: 'Africa' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda', flag: '🇷🇼', group: 'Africa' },
  { code: 'ny', name: 'Chichewa', native: 'Chichewa', flag: '🇲🇼', group: 'Africa' },
  { code: 'sn', name: 'Shona', native: 'chiShona', flag: '🇿🇼', group: 'Africa' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦', group: 'Africa' },

  // 🌏 ASIA - Sud
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', group: 'Asia' },
  { code: 'bn', name: 'Bengalese', native: 'বাংলা', flag: '🇧🇩', group: 'Asia' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', group: 'Asia' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', group: 'Asia' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', group: 'Asia' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', group: 'Asia' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', group: 'Asia' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', group: 'Asia' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', group: 'Asia' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', group: 'Asia' },
  { code: 'si', name: 'Singalese', native: 'සිංහල', flag: '🇱🇰', group: 'Asia' },
  { code: 'ne', name: 'Nepalese', native: 'नेपाली', flag: '🇳🇵', group: 'Asia' },

  // 🌏 ASIA - Est e Sud-Est
  { code: 'zh-CN', name: 'Cinese', native: '中文', flag: '🇨🇳', group: 'Asia' },
  { code: 'ja', name: 'Giapponese', native: '日本語', flag: '🇯🇵', group: 'Asia' },
  { code: 'ko', name: 'Coreano', native: '한국어', flag: '🇰🇷', group: 'Asia' },
  { code: 'tl', name: 'Tagalog', native: 'Wikang Tagalog', flag: '🇵🇭', group: 'Asia' },
  { code: 'vi', name: 'Vietnamita', native: 'Tiếng Việt', flag: '🇻🇳', group: 'Asia' },
  { code: 'th', name: 'Thailandese', native: 'ภาษาไทย', flag: '🇹🇭', group: 'Asia' },
  { code: 'my', name: 'Birmano', native: 'ဗမာစာ', flag: '🇲🇲', group: 'Asia' },
  { code: 'ms', name: 'Malese', native: 'Bahasa Melayu', flag: '🇲🇾', group: 'Asia' },
  { code: 'id', name: 'Indonesiano', native: 'Bahasa Indonesia', flag: '🇮🇩', group: 'Asia' },
  { code: 'km', name: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭', group: 'Asia' },

  // 🌍 MEDIO ORIENTE / ASIA CENTRALE
  { code: 'fa', name: 'Persiano', native: 'فارسی', flag: '🇮🇷', group: 'Medio Oriente' },
  { code: 'ku', name: 'Curdo', native: 'Kurdî', flag: '🇮🇶', group: 'Medio Oriente' },
  { code: 'tr', name: 'Turco', native: 'Türkçe', flag: '🇹🇷', group: 'Medio Oriente' },
  { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫', group: 'Medio Oriente' },
  { code: 'uz', name: 'Uzbeco', native: 'Oʻzbekcha', flag: '🇺🇿', group: 'Asia Centrale' },

  // 🌎 AMERICA LATINA
  { code: 'ht', name: 'Creolo Haitiano', native: 'Kreyòl ayisyen', flag: '🇭🇹', group: 'America' },
  { code: 'qu', name: 'Quechua', native: 'Runasimi', flag: '🇵🇪', group: 'America' },

  // 🌏 ALTRI
  { code: 'en', name: 'Inglese', native: 'English', flag: '🇬🇧', group: 'Internazionale' },
];

/**
 * Traduce un singolo blocco di testo
 */
export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === 'it') return text;
  
  try {
    const url = `${GOOGLE_TRANSLATE_ENDPOINT}${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Google ritorna un array di array, uniamo le parti tradotte
    if (data && data[0]) {
      return data[0].map((part: any) => part[0]).join('');
    }
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

/**
 * Traduce un'intera legge (titolo, descrizione, requisiti, ecc.)
 */
export async function translateLaw(law: any, targetLang: string): Promise<any> {
    if (targetLang === 'it') return law;

    const translatedLaw = { ...law };
    
    // Traduzione in parallelo per velocità
    const [title, description, duration, whereToApply] = await Promise.all([
        translateText(law.title, targetLang),
        translateText(law.description, targetLang),
        translateText(law.duration, targetLang),
        translateText(law.whereToApply, targetLang)
    ]);

    translatedLaw.title = title;
    translatedLaw.description = description;
    translatedLaw.duration = duration;
    translatedLaw.whereToApply = whereToApply;

    // Tradiamo l'array dei requisiti
    if (law.requirements && Array.isArray(law.requirements)) {
        translatedLaw.requirements = await Promise.all(
            law.requirements.map((req: string) => translateText(req, targetLang))
        );
    }

    // Tradiamo l'array dei documenti
    if (law.documentsNeeded && Array.isArray(law.documentsNeeded)) {
        translatedLaw.documentsNeeded = await Promise.all(
            law.documentsNeeded.map((doc: string) => translateText(doc, targetLang))
        );
    }

    return translatedLaw;
}
