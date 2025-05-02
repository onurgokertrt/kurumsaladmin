// i18n-server.js
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

const initI18nextServer = async () => {
  await i18next
    .use(HttpBackend)
    .init({
      lng: 'tr', // Varsayılan dil
      fallbackLng: 'tr',
      supportedLngs: ['en', 'tr'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Çeviri dosyalarının yolu
      },
      ns: ['common'],
      defaultNS: 'common',
    });

  console.log('i18next server initialized successfully');
};

initI18nextServer().catch((err) => {
  console.error('i18next server initialization failed:', err);
});

export default i18next;