import HttpClient from '@/api/httpClient';
import { Order, User } from '@/store/reducers/user';

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super(process.env.URL_API);
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public getMe = () => this.instance.get<User>('/users/profile');

  public getOrders = () => this.instance.get<Order[]>('/orders');

  public getOrderItems = () => this.instance.get<any>('/mock/nsw/titles/search/adress');
}

export default MainApi;
