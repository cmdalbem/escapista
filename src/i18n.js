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
      
      'later': 'A seguir',

      'video-error': 'Opa, esse vídeo parece não estar funcionando.\nPor favor, tente outro canal.',
      
      'suggest': 'Sugerir vídeo',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'Sobre',
      
      'buymeacoffee': 'Apoie o projeto',
      
      'turn-phone': 'Gire seu celular para uma melhor experiência.',

      'welcome-heading': 'Para onde você\nquer escapar?',
      'welcome-body1': 'Escolha um canal e deixe sua mente vagar com a programação de vídeos que curamos para você. Relaxe com as imagens e sons naturais enquanto trabalha, ponha na TV da sala ou combine com amigos para passearem juntos enquanto conversam',
      'welcome-body2': '',
      'welcome-body3': '',
      'welcome-cta': 'Começar',
      'read-the-manifesto': 'Leia o manifesto',
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

      'later': 'Up next',

      'video-error': 'Ops, this video seems to not be working.\nPlease try another channel.',

      'suggest': 'Suggest video',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'About',

      'buymeacoffee': 'Support us',
      
      'turn-phone': 'Please turn your device for a better experience.',

      'welcome-heading': 'Curated videos to relax and explore the world from home',
      'welcome-body1': 'Choose a channel and let your mind wander with the great Slow TV and ambient videos we handpicked for you. Relax with the natural images and sounds while you work, put on your TV or invite your friends to watch together.',
      'welcome-body2': '',
      'welcome-body3': '',
      'welcome-cta': 'Start watching',
      'know-more': 'Know more',
      'read-the-manifesto': 'Read the manifesto',
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

      'later': 'A continuación',
      
      'suggest': 'Sugerir video',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'Acerca',

      'buymeacoffee': 'Apoyanos',
      
      'turn-phone': 'Gire su dispositivo para obtener la mejor experiencia.',

      'welcome-heading': '¿A dónde\nquieres escapar?',
      'welcome-body1': 'Esta es tu oportunidad de escapar a nuevos lugares. Elija un canal y deje que su mente divague con los videos que seleccionamos para usted.',
      'welcome-body2': 'Relájese con las imágenes y los sonidos naturales mientras trabaja, enciende la televisión o invita a sus amigos a mirar juntos.',
      'welcome-body3': '',
      'welcome-cta': 'Empezar',
      'read-the-manifesto': 'Lea el manifesto',
    }
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    // lng: 'en-US',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;