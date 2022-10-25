import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface User {
  id: number,
  name: string,
  email: string,
  photo: string
}

export interface Order {
  id: number,
  matter: string,
  service: string,
  description: string,
  status: string,
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
  orderId: number,
  region: string,
  service: string,
  itemBody: {
    productId: number,
    name?: string,
    idNumber?: string,
    price: string,
    link?: string
  }
}

export interface OrderDetails {
  matter: string,
  service: string,
  description: string,
  totalPrice: string,
  createdAt: string,
  updatedAt: string,
  status: string,
  orderItems: OrderItems[]
}

interface UserState {
  user: User | null,
  isLoggedIn: boolean,
  orders: Order[] | null,
  matters: Matters | null,
  orderDetails: OrderDetails | null
}

const InitialState: UserState = {
  user: null,
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
}

export default createReducerFunction(UserReducer, InitialState);
