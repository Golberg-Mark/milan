import { AxiosRequestConfig } from 'axios';

import HttpClient from '@/api/httpClient';

export class HttpClientProtected extends HttpClient {
  constructor() {
    super(process.env.URL_API ? process.env.URL_API : 'https://michael.lambda-team.website');

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(this.requestInterceptor);
  }

  private requestInterceptor(config: AxiosRequestConfig) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    config.headers!.Authorization = `Bearer ${token}`;

    return config;
  }
}
