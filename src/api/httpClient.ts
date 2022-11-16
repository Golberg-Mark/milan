import axios, { AxiosInstance, AxiosResponse } from 'axios';
import MainApi from '@/api/mainApi';

class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.responseSuccess, this.responseError);
  }

  private responseSuccess = (response: AxiosResponse) => response.data.data;

  private responseError = async (error: any) => {
    const status = error.response.status;
    const refreshToken = localStorage.getItem('refreshToken');

    if (status === 0 || status === 401 && refreshToken) {
      try {
        const { accessToken: access_token, refreshToken: refresh_token } = await new MainApi()
          .refreshAccessToken(refreshToken!);

        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        error.config.headers.Authorization = `Bearer ${access_token}`;
        return await this.instance.request(error.config);
      } catch (_) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        return Promise.reject({
          code: status,
          message: error.response.data?.message || ''
        });
      }
    }
  };
}

export default HttpClient;
