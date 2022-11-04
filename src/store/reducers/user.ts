import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface User {
  id: number,
  name: string,
  email: string,
  photo: string,
  organisationId: number
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
  isLoggedIn: boolean,
  orders: Order[] | null,
  matters: Matters | null,
  orderDetails: OrderDetails | null
}

const InitialState: UserState = {
  user: null,
  orgUsers: null,
  isLoggedIn: true,
  orders: null,
  matters: null,
  orderDetails: null
};

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;
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
}

export default createReducerFunction(UserReducer, InitialState);
