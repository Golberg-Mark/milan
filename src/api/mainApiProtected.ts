import { HttpClientProtected } from '@/api/httpClientProtected';
import { PlaceOrder, PlaceOrderProduct } from '@/store/reducers/order';
import { OrderDetails, OrganizationUser, User, Product } from '@/store/reducers/user';
import { Product as OrderProduct } from '@/store/reducers/order';

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

  public getPriceList = (orgId: number) => this.instance.get<Product[]>(`organisations/price-list/${orgId}`);

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

  public getOrganisationProducts = (orgId: number) => (
    this.instance.get<OrderProduct[]>(`organisations/products/${orgId}`)
  );
}
