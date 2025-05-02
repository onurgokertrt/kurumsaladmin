// i18n.ts
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const initI18next = async () => {
  await i18next
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: 'tr', // Varsayılan dil
      fallbackLng: 'tr',
      supportedLngs: ['en', 'tr'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Çeviri dosyalarının yolu
      },
      ns: ['common'],
      defaultNS: 'common',
      react: {
        useSuspense: false, // Suspense kullanmayı devre dışı bırakıyoruz
      },
    });

  console.log('i18next initialized successfully');
};

initI18next().catch((err) => {
  console.error('i18next initialization failed:', err);
});

export default i18next;