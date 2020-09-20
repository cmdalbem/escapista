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
      
      'suggest': 'Colabore',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'Sobre',
      
      'turn-phone': 'Gire seu celular para ter a melhor experiência.',
      
      'welcome-heading': 'Para onde você quer escapar?',
      'welcome-body1': 'Esta é sua oportunidade de escapar para novos lugares. Escolha um canal e deixe sua mente vagar com a programação que curamos para você.',
      'welcome-body2': 'Relaxe com os vídeos e o som natural enquanto trabalha, ponha na TV da sala ou combine com amigos para passearem juntos enquanto conversam.',
      'welcome-body3': 'O Escapista é um pano de fundo para sua vida acontecer.',
      'welcome-cta': 'Começar'
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

      'suggest': 'Contribute',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'About',
      
      'turn-phone': 'Please turn your device for a best experience.'
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
      
      'suggest': 'Contribuir',
      'manifesto': 'Manifesto',
      'feedback': 'Feedback',
      'about': 'Acerca',
      
      'turn-phone': 'Gire su dispositivo para obtener la mejor experiencia.'
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