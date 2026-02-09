'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import en from '../app/messages/en.json';
import fr from '../app/messages/fr.json';

const translations = { en, fr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');

  // Sauvegarder la langue dans localStorage
  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}