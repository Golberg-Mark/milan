import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface PlaceOrderProduct {
  productId: string;
  input: object;
  price: string;
  itemMeta: string;
  fulfilmentType: 'auto' | 'manual';
}

export interface PlaceOrder {
  matter: string;
  description: string;
  region: string;
  orderItems: PlaceOrderProduct[];
  organisationId: number;
  userId: number;
}

export interface Product {
  "productId": string,
  "searchType": string,
  "input1": string,
  "placeholder": string,
  "input2": string | null,
  "placeholder2": string | null
}

export interface ProductWithMatchedPriceList  extends Product {
  'priceExGST': string,
  'GST': string,
  'priceInclGST': string,
  'collection': string
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
  products: ProductWithMatchedPriceList[] | null,
  services: ProductWithMatchedPriceList[] | null,
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
  services: null,
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

  public setProducts(value: ProductWithMatchedPriceList[] | null) {
    this.draftState.products = value;
  }

  public setServices(value: ProductWithMatchedPriceList[] | null) {
    this.draftState.services = value;
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
    this.draftState.orderProducts = null;
    this.draftState.totalItemsAmount = 0;
    this.draftState.totalPrice = 0;
    this.draftState.productsPrice = 0;
  }
}

export default createReducerFunction(OrderReducer, InitialState);
