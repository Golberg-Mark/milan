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
    const token = localStorage.getItem('token');

    config.headers!.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6MCwicGFzc3dvcmQiOiI5ZTY2ODU4MTdhYzU1NWFmLjhhZDFjMjZmZjY4NGNlODEzMDBlOTg1MTQ1NzllYWMyZDM1NTliZTBkZjEzZWY0MmZkMjY1NzRkY2NlOTAwMTIxZGJjNWYyMDQ4ODkxMTI3MzJkMjU3ZjdjMGI0ZjgyYjcxOTM3NzBiNGJhNTQwYTE5OTlkYzc1ZDI2Njk3OTY5Iiwicm9sZSI6InN5c3RlbV9hZG1pbiIsImlhdCI6MTY2NjUxNjAzMywiZXhwIjoxNjY2NjAyNDMzfQ.KQJlLKW836wPRf5rZyQ3LubOgWVFvOr7DZ-F4HlxpDE`;

    return config;
  }
}
