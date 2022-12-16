import { ImmerReducer, createReducerFunction } from 'immer-reducer';
import { ExistingRegions } from '@/utils/getRegionsData';

export enum Roles {
  SYSTEM_ADMIN = 'system_admin',
  CUSTOMER_ADMIN = 'admin_customer',
  CUSTOMER = 'customer'
}

export enum PopupTypes {
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum OrderStatusEnum {
  OPEN = 'open',
  COMPLETE = 'complete',
  ERROR = 'error',
  IN_PROGRESS = 'in progress',
  REFUNDED = 'refunded',
  WAITING = 'waiting',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
}

export interface IUpdatePasswordBody {
  otp: string,
  email: string,
  newPassword: string
}

export interface IPopupMessage {
  type: PopupTypes,
  mainText: string,
  additionalText: string
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  state: ExistingRegions,
  email: string,
  role: Roles,
  organisations: {
    roleWithinOrganisation: string,
    id: number,
    name: string,
    isActive: boolean,
    creditLimit: number
  }[]
}

export interface Order {
  id: string,
  matter: string,
  service: string,
  description: string,
  status: OrderStatusEnum,
  type: 'regular' | 'list',
  user: number,
  date: number
}

export interface Matter {
  matter: string,
  description: string,
  lastOrdered: number,
  ordersAmount: number,
  pending: number,
  orders: Order[]
}

export type Matters = { [key: string]: Matter };

export interface Product {
  'collection': string
  'productCode': string,
  'supplier': string,
  'region': string,
  'description': string,
  'searchType': string,
  'priceExGST': string,
  'GST': string,
  'priceInclGST': string
}

export interface OrderItems {
  id: number,
  orderId: string,
  region: string,
  service: string,
  path: string,
  price: string,
  productName: string,
  productId: number,
}

export interface OrderDetails {
  matter: string,
  service: string,
  description: string,
  price: string,
  createdAt: string,
  updatedAt: string,
  status: string,
  orderItems: OrderItems[]
}

export interface OrganizationUser {
  id: number,
  name: string,
  email: string,
  isEmailVerified: boolean,
  role: string
}

interface UserState {
  user: User | null,
  orgUsers: OrganizationUser[] | null,
  isLoadingUser: boolean,
  orders: Order[] | null,
  matters: Matters | null,
  orderDetails: OrderDetails | null,
  priceList: Product[] | null,
  selectedMatter: string | null,
  popup: IPopupMessage | null
}

const InitialState: UserState = {
  user: null,
  orgUsers: null,
  isLoadingUser: false,
  orders: null,
  matters: null,
  orderDetails: null,
  priceList: null,
  selectedMatter: null,
  popup: null
};

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setIsLoadingUser(value: boolean) {
    this.draftState.isLoadingUser = value;
  }

  public setPriceList(value: Product[] | null) {
    this.draftState.priceList = value;
  }

  public setOrders(value: Order[] | null) {
    this.draftState.orders = value;
  }

  public setMatters(value: Matters | null) {
    this.draftState.matters = value;
  }

  public setOrderDetails(value: OrderDetails | null) {
    this.draftState.orderDetails = value;
  }

  public setOrgUsers(value: OrganizationUser[] | null) {
    this.draftState.orgUsers = value;
  }

  public setSelectedMatter(value: string | null) {
    this.draftState.selectedMatter = value;
  }

  public setPopup(value: IPopupMessage | null) {
    this.draftState.popup = value;
  }

  public logout() {
    this.draftState.user = null;
  }
}

export default createReducerFunction(UserReducer, InitialState);
