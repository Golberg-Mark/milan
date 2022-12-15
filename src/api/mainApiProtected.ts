import { HttpClientProtected } from '@/api/httpClientProtected';
import { PlaceOrder, PlaceOrderProduct } from '@/store/reducers/order';
import { OrderDetails, OrganizationUser, User, Product, IUpdatePasswordBody } from '@/store/reducers/user';
import { Product as OrderProduct } from '@/store/reducers/order';
import { ICreateOrganisation, IEditOrganisation, IOrganisation } from '@/store/reducers/organisations';
import { ICreateNotice, INotice, IUpdateNotice } from '@/store/reducers/notices';
// import { IAssignPriceList, IPriceList } from '@/store/reducers/priceList';
import { IOrganisationUser } from '@/store/reducers/users';
import { IService } from '@/store/reducers/services';

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public updatePassword = (body: IUpdatePasswordBody) => (
    this.instance.post('/login/change-password', body)
  )

  public getMe = () => this.instance.get<User>('/users/profile');

  // public getPriceLists = () => this.instance.get<IPriceList[]>(`/price-lists`);

  public getPriceList = (orgId: number) => this.instance.get<Product[]>(`/organisations/price-list/${orgId}`);

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

  public getOrganisations = () => (
    this.instance.get<IOrganisation[]>(`/organisations`)
  );

  public editOrganisation = (id: number, body: Omit<IEditOrganisation, 'id'>) => (
    this.instance.patch<Omit<IEditOrganisation, 'id'>, IOrganisation>(`/organisations/${id}`, body)
  );

  public createOrganisation = (body: ICreateOrganisation) => (
    this.instance.post<IOrganisation>(`/organisations`, body)
  );

  // public assignPriceListToOrganisation = (id: number, priceListId: number, body: IAssignPriceList) => (
  //   this.instance.patch<IOrganisation>(`/organisations/price-list/${id}/${priceListId}`, body)
  // );

  public getNotices = () => (
    this.instance.get<INotice[]>(`/notice`)
  );

  public createNotice = (body: ICreateNotice) => (
    this.instance.post<INotice>(`/notice`, body)
  );

  public updateNotice = (id: number, body: IUpdateNotice) => (
    this.instance.patch<INotice>(`/notice/${id}`, body)
  );

  public deleteNotice = (id: number) => (
    this.instance.delete<INotice>(`/notice/${id}`)
  );

  public getUsers = () => (
    this.instance.get<IOrganisationUser[]>(`/users`)
  );

  public getProducts = () => (
    this.instance.get<Product[]>(`/products`)
  );

  public getServices = () => (
    this.instance.get<IService[]>(`/products`)
  );
}
