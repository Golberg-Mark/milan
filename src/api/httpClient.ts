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

    if (status === 0 || status === 401) {
      try {
        let refreshToken = localStorage.getItem('refreshToken');
        const newConfig = {
          ...error.config,
          headers: {
            ...error.config.headers,
            'Content-Type': 'application/json',
          },
        };

        if (refreshToken) {
          const { accessToken: access_token, refreshToken: refresh_token } = await new MainApi()
            .refreshAccessToken(refreshToken);

          localStorage.setItem('token', access_token);
          localStorage.setItem('refreshToken', refresh_token);

          newConfig.headers.Authorization = `Bearer ${access_token}`;
        }

        const sessionRefreshToken = sessionStorage.getItem('refreshToken');

        if (sessionRefreshToken) {
          const { accessToken: access_token, refreshToken: refresh_token } = await new MainApi()
            .refreshAccessToken(sessionRefreshToken);

          sessionStorage.setItem('token', access_token);
          sessionStorage.setItem('refreshToken', refresh_token);

          newConfig.headers.Authorization = `Bearer ${access_token}`;
        }

        return (await axios.request(newConfig)).data.data;
      } catch (_) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');

        return Promise.reject({
          code: status,
          message: error.response.data?.message || ''
        });
      }
    } return error.response;
  };
}

export default HttpClient;
