import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

  private responseSuccess = (response: AxiosResponse) => response.data;

  private responseError = (error: any) => {
    const status = error.response.status;

    if (status === 0 || status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject({
      code: status,
      message: error.response.data?.message || ''
    });
  };
}

export default HttpClient;
