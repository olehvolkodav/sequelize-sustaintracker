import Api from '../api';

import { Language } from './types';

class LanguageService extends Api {
  async ListLanguages() {
    return this.doRequest<Language[]>({
      endpoint: '/languages',
    });
  }
}

export const languageService = new LanguageService();
