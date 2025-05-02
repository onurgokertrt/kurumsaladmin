// // i18n-client.js
// import i18next from 'i18next';
// import HttpBackend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';

// const initI18nextClient = async () => {
//   await i18next
//     .use(HttpBackend)
//     .use(initReactI18next) // Client tarafında Context'e bağımlı
//     .init({
//       lng: 'tr', // Varsayılan dil
//       fallbackLng: 'tr',
//       supportedLngs: ['en', 'tr'],
//       backend: {
//         loadPath: '/locales/{{lng}}/{{ns}}.json', // Çeviri dosyalarının yolu
//       },
//       ns: ['common'],
//       defaultNS: 'common',
//       react: {
//         useSuspense: false, // Suspense kullanmayı devre dışı bırakıyoruz
//       },
//     });

//   console.log('i18next client initialized successfully');
// };

// initI18nextClient().catch((err) => {
//   console.error('i18next client initialization failed:', err);
// });

// export default i18next;


// import i18next from 'i18next';
// import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';

// if (!i18n.isInitialized) {
//   i18n
//     .use(Backend)
//     .use(initReactI18next)
//     .init({
//       fallbackLng: 'tr',
//       debug: false,
//       ns: ['common'],
//       defaultNS: 'common',
//       lng: typeof window !== 'undefined'
//         ? window.location.pathname.split('/')[1]
//         : 'tr',
      

//       backend: {
//         loadPath: '/locales/{{lng}}/{{ns}}.json',
//       },
//       interpolation: {
//         escapeValue: false,
//       },
//     });
    
// }
// console.log("Active language: ",i18next.language)

// export default i18n;

// i18n-client.js
'use client' // Bu satırı ekleyin!

import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const initializeI18n = () => {
  if (!i18n.isInitialized) {
    i18n
      .use(Backend)
      .use(initReactI18next)
      .init({
        fallbackLng: 'tr',
        debug: process.env.NODE_ENV === 'development',
        ns: ['common'],
        defaultNS: 'common',
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
          escapeValue: false,
        }
      })
  }
  return i18n
}

const instance = initializeI18n()
export default instance