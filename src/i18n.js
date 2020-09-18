import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
  'pt-BR': {
    translation: {
      'mute-on': 'Desligar som',
      'mute-off': 'Ligar som',
      'fullscreen-on': 'Maximizar tela',
      'fullscreen-off': 'Minimizar tela',
      'menu-on': 'Fechar menu',
      'menu-off': 'Abrir menu',
      'suggest-videos': 'Sugerir vídeos',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
    }
  },
  'en': {
    translation: {
      'mute-on': 'Mute',
      'mute-off': 'Unmute',
      'fullscreen-on': 'Maximize screen',
      'fullscreen-off': 'Minimize screen',
      'menu-on': 'Close menu',
      'menu-off': 'Open menu',
      'suggest-videos': 'Suggest videos',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
    }
  },
  'es': {
    translation: {
      'mute-on': '',
      'mute-off': '',
      'fullscreen-on': '',
      'fullscreen-off': '',
      'menu-on': '',
      'menu-off': '',
      'suggest-videos': 'Sugerir videos',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
    }
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'pt-BR',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;