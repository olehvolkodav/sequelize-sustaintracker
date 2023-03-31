import Api from '../api';

import { Currency } from './types';

class CurrencyService extends Api {
  async ListCurrencies() {
    return this.doRequest<Currency[]>({
      endpoint: '/currencies',
    });
  }
}

export const currencyService = new CurrencyService();
