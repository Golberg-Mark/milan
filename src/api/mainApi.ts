import HttpClient from '@/api/httpClient';
import { Order } from '@/store/reducers/user';
import { Product } from '@/store/reducers/order';

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super(process.env.URL_API ? process.env.URL_API : 'https://michael.lambda-team.website');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public register = (email: string, password: string) => (
    this.instance.post('/registration', {
      email,
      password
    })
  );

  public validateOtp = (email: string, otp: string) => (
    this.instance.post<{ access_token: string, refresh_token: string }>('/registration/validate', {
      email,
      otp
    })
  );

  public login = (email: string, password: string) => (
    this.instance.post<{ accessToken: string, refreshToken: string }>('/login', {
      email,
      password
    })
  );

  public refreshAccessToken = (refreshToken: string) => this.instance.post('/login/refresh', { refreshToken });

  public getOrders = () => this.instance.get<Order[]>('/orders');

  public getOrderItems = (region: string, service: string) => (
    //this.instance.get<Product[]>(`/mock/${region}/${service}`)
    this.instance.post(`/mock/wa/title-reference`, {
      matterReference: 'Test',
      titleReference: '2100/341'
    })
  )
}

export default MainApi;
