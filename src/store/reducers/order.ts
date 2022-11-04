import { ImmerReducer, createReducerFunction } from 'immer-reducer';

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
  products: PlaceOrderProduct[],
  organisationId: number,
  orderType: 'list' | 'regular'
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

interface OrderState {
  matter: string,
  description: string,
  productsPrice: number,
  totalPrice: number,
  totalItemsAmount: number,
  order: PlaceOrder | null,
  orderId: string | null,
  orderProducts: PlaceOrderProduct[] | null,
  products: RefactoredProduct[] | null,
  isProductsLoading: boolean
}

const InitialState: OrderState = {
  matter: '',
  description: '',
  productsPrice: 0,
  totalPrice: 0,
  totalItemsAmount: 0,
  order: null,
  orderId: null,
  orderProducts: null,
  products: null,
  isProductsLoading: false
};

export class OrderReducer extends ImmerReducer<OrderState> {
  public setMatter(value: string) {
    this.draftState.matter = value;
  }

  public setDescription(value: string) {
    this.draftState.description = value;
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

  public setOrderId(value: string | null) {
    this.draftState.orderId = value;
  }

  public setOrderProducts(value: PlaceOrderProduct[] | null) {
    this.draftState.orderProducts = value;
  }

  public setIsProductsLoading(value: boolean) {
    this.draftState.isProductsLoading = value;
  }

  public cleanCurrentOrder() {
    this.draftState.orderId = null;
    this.draftState.order = null;
    this.draftState.products = null;
    this.draftState.orderProducts = null;
    this.draftState.totalItemsAmount = 0;
    this.draftState.totalPrice = 0;
    this.draftState.productsPrice = 0;
  }
}

export default createReducerFunction(OrderReducer, InitialState);
