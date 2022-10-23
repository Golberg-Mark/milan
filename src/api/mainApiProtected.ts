import { HttpClientProtected } from '@/api/httpClientProtected';
import { PlaceOrder, PlaceOrderProduct } from '@/store/reducers/order';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public placeOrder = (order: PlaceOrder) => (
    this.instance.post<{ id: number, products: PlaceOrderProduct[] }>('/orders', order)
  );

  public editOrder = (id: number, order: PlaceOrder) => (
    this.instance.patch<{ id: number, products: PlaceOrderProduct[] }>(`/orders/${id}`, order)
  );
}
