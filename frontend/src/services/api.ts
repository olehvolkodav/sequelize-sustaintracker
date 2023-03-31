import axios, { AxiosInstance } from 'axios';

import { api } from '../config';

type IResponse<T> = T & {
  error?: Error;
};

interface IRequest {
  endpoint: string;
}

class Api {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: api.baseURL,
    });
  }

  protected async doRequest<T>({ endpoint }: IRequest): Promise<IResponse<T>> {
    const response = await this.api
      .post(endpoint)
      .then((res) => {
        console.info(endpoint, res.data);
        return res.data;
      })
      .catch((error) => {
        console.error(endpoint, error.response?.data);
      });
    return response;
  }
}

export default Api;
