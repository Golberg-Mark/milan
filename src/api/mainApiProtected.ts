import { HttpClientProtected } from '@/api/httpClientProtected';
import { PlaceOrder, PlaceOrderProduct } from '@/store/reducers/order';
import { OrderDetails, OrganizationUser, User } from '@/store/reducers/user';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public getMe = () => this.instance.get<User>('/users/profile');

  public placeOrder = (order: PlaceOrder) => (
    this.instance.post<{ orderId: string, products: PlaceOrderProduct[] }>('/orders', order)
  );

  public getOrderDetails = (id: string) => (
    this.instance.get<OrderDetails>(`/orders/${id}`)
  );

  public getUsersByOrganization = (id: number) => (
    this.instance.get<OrganizationUser[]>(`/organisations/users/${id}`)
  );

  public getOrganisationsByUser = (id: number) => (
    this.instance.get<OrganizationUser[]>(`/users/organisations/${id}`)
  );
}
