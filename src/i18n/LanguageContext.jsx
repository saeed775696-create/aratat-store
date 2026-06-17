// ─── Language Context & Hook ───────────────────────────────────────────────
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import ar from './ar.js';
import en from './en.js';

const translations = { ar, en };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('aratat_lang') || 'ar';
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('aratat_lang', next);
      return next;
    });
  }, []);

  // Apply dir + lang to <html>
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useCallback(
    (path) => {
      const keys = path.split('.');
      let result = translations[lang];
      for (const key of keys) {
        result = result?.[key];
        if (result === undefined) {
          // Fallback to AR then raw key
          let fallback = translations.ar;
          for (const k of keys) fallback = fallback?.[k];
          return fallback ?? path;
        }
      }
      return result ?? path;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
