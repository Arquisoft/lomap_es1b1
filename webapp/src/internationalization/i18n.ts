import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from "./locales/en.json";
import translationSpanish from "./locales/es.json";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: translationEnglish
  },
  es: {
    translation: translationSpanish
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
  });

export default i18n