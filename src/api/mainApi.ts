import HttpClient from '@/api/httpClient';
import { Order, Product, User } from '@/store/reducers/user';

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super(process.env.URL_API ? process.env.URL_API : 'https://michael.lambda-team.website');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public getMe = () => this.instance.get<User>('/users/profile');

  public getOrders = () => this.instance.get<Order[]>('/orders');

  public getOrderItems = (region: string, service: string) => (
    this.instance.get<{ products: Product[] }>(`/mock/${region}/${service}`)
  )
}

export default MainApi;
