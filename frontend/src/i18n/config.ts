import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { api } from '../config';

export const languages = ['en', 'pt'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: `${api.baseURL}/locales/{{lng}}/{{ns}}`,
    },
    // TODO: remove this
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
