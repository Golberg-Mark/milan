import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface Order {
  matter: string,
  service: string,
  description: string,
  status: string,
  user: number,
  create: string
}

export interface PlaceOrderProduct {
  productId: number,
  name?: string,
  idNumber?: string,
  price: string,
  body?: any
}

export interface PlaceOrder {
  matter: string,
  description: string,
  region: string,
  service: string,
  totalPrice: string,
  fulfilmentStatus: string,
  products: PlaceOrderProduct[]
}

export interface User {
  id: number,
  name: string,
  email: string,
  photo: string
}

export interface BaseProduct {
  id: number,
  name: string
}

export interface Product extends BaseProduct {
  price: string,
  items: string[]
}

export interface RefactoredProduct extends BaseProduct {
  price: string,
  items: {
    name: string,
    isChosen: boolean
  }[]
}

interface UserState {
  user: User | null,
  isLoggedIn: boolean,
  orders: Order[] | null,
  productsPrice: number,
  totalPrice: number,
  totalItemsAmount: number,
  order: PlaceOrder | null,
  orderId: number | null,
  products: RefactoredProduct[] | null
}

const InitialState: UserState = {
  user: null,
  isLoggedIn: true,
  orders: null,
  productsPrice: 0,
  totalPrice: 0,
  totalItemsAmount: 0,
  order: null,
  orderId: null,
  products: null
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

  public setProductsPrice(value: number) {
    this.draftState.productsPrice = value;
  }

  public setTotalPrice(value: number) {
    this.draftState.totalPrice = value;
  }

  public setTotalItemsAmount(value: number) {
    this.draftState.totalItemsAmount = value;
  }

  public setProducts(value: RefactoredProduct[] | null) {
    this.draftState.products = value;
  }

  public setOrderId(value: number | null) {
    this.draftState.orderId = value;
  }
}

export default createReducerFunction(UserReducer, InitialState);
