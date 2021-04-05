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

      'welcome-cta': 'Começar',
      'read-the-manifesto': 'Leia o manifesto',
      'read-more': 'Saiba mais',

      // Landing page
      'welcome-title': 'Vídeos selecionados para relaxar e explorar o mundo de casa',
      
      'welcome-heading1': 'Escolha um canal e deixe sua mente vagar com o fluxo contínuo de conteúdo',
      'welcome-body1': "Slow TV é televisão na velocidade da vida. E, como na vida, não há botões de pausar ou passar. É a perfeita experiência minimalista e relaxante.",

      'welcome-heading2': 'Uma seleção de vídeos dos melhores criadores e lugares incríveis ao redor do mundo',
      'welcome-body2': "Todas visualizações e receita vão para os criadores originais - os verdadeiros artistas por trás disso tudo.",

      'welcome-heading3': 'Assista centenas de horas de Slow TV, carinhosamente curadas por seres humanos',
      'welcome-body3': 'Nós vasculhamos a Rede Mundial de Computadores para colher apenas as melhores aventuras para você. Para cada vídeo selecionado, 10 outros não foram.',

      'welcome-heading4': 'Relaxe com as imagens e sons naturais enquanto trabalha, ponha na TV da sala ou combine com amigos para um passeio remoto',
      'welcome-body4': 'Os vídeos estão sempre sincronizados, então basta você compartilhar o link com alguém que você queira assistir juntos.',

      'welcome-final': 'Para onde você\nquer escapar?',

      'welcome-bignum1': 'Continentes',
      'welcome-bignum2': 'Criadores',
      'welcome-bignum3': 'Vídeos curados',
      'welcome-bignum4': 'Horas de conteúdo',

      'footer': 'Se você puder, fique em casa. Salve vidas.'
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

      'welcome-cta': 'Start watching',
      'read-more': 'Read more',
      'read-the-manifesto': 'Read the manifesto',

      // Landing page
      'welcome-title': 'Curated videos to relax and explore the world from home',
      
      'welcome-heading1': 'Choose a channel and let your mind wander with the continuous stream of content',
      'welcome-body1': "It's television at the speed of life. And, as in life, it doesn't come with a pause or skips buttons. It's the ultimate minimalist, relaxing experience.",

      'welcome-heading2': 'A selection of videos from the best creators and stunning places around the world',
      'welcome-body2': 'It\'s built on top of a simple YouTube Player, so all views and ad revenue goes to the original creators - the real artists here :)',

      'welcome-heading3': 'Watch hundreds of hours of Slow TV content, dearly curated by human beings',
      'welcome-body3': 'We swept the World Wide Web to collect only the best adventures. For each video selected, ten other weren\'t.',

      'welcome-heading4': 'Enjoy it while you work, put on your TV or invite a friend for a remote stroll',
      'welcome-body4': 'Videos are always in sync, so just share the link with someone you want to watch together and you\'re good to go.',

      'welcome-final': 'Where do you want to escape to?',

      'welcome-bignum1': 'Continents',
      'welcome-bignum2': 'Creators',
      'welcome-bignum3': 'Curated videos',
      'welcome-bignum4': 'Hours of content',

      'footer': 'If you can, stay home. Save lives.'
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
      
      'welcome-cta': 'Empezar',
      'read-more': 'Saber más',
      'read-the-manifesto': 'Lea el manifesto',
      
      // Landing page
      'welcome-title': 'Vídeos seleccionados para relajarse y explorar el mundo desde casa',

      'welcome-heading1': 'Elija un canal y deje que su mente divague con el flujo continuo de contenido',
      'welcome-body1': "Es televisión a la velocidad de la vida. Y, como en la vida, no viene con una pausa o salta botones. Es la mejor experiencia minimalista y relajante.",

      'welcome-heading2': 'Una selección de videos de los mejores creadores y lugares asombrosos de todo el mundo.',
      'welcome-body2': "Todas las vistas y los ingresos publicitarios van a los creadores originales - los verdaderos artistas aquí :)",

      'welcome-heading3': 'Mira cientos de horas de contenido de Slow TV, cuidadosamente seleccionado por seres humanos.',
      'welcome-body3': 'Recorrimos la World Wide Web para recopilar solo las mejores aventuras. Por cada video seleccionado, otros 10 no lo fueron.',

      'welcome-heading4': 'Disfrútelo mientras trabaja, póngalo en su televisor o invite a un amigo a dar un paseo a distancia',
      'welcome-body4': 'Los videos siempre están sincronizados, así que solo comparte el enlace con alguien que quieras ver juntos y listo.',

      'welcome-final': '¿A dónde\nquieres escapar?',

      'welcome-bignum1': 'Continentes',
      'welcome-bignum2': 'Creadores',
      'welcome-bignum3': 'Videos seleccionados',
      'welcome-bignum4': 'Horas de contenido',

      'footer': 'Quédate en casa. Salva vidas.'
    }
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    // lng: 'es',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;