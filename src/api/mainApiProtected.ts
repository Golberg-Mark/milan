import { HttpClientProtected } from '@/api/httpClientProtected';
import { PlaceOrder } from '@/store/reducers/user';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public placeOrder = (order: PlaceOrder) => this.instance.post<any>('/orders', order);
}
