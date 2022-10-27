import { createActionCreators } from 'immer-reducer';

import { OrderReducer, PlaceOrder, PlaceOrderProduct, RefactoredProduct } from '@/store/reducers/order';
import { AsyncAction } from '@/store/actions/common';

export const orderActions = createActionCreators(OrderReducer);

export type OrderActions = ReturnType<typeof orderActions.setProducts>
  | ReturnType<typeof orderActions.setProductsPrice>
  | ReturnType<typeof orderActions.setTotalPrice>
  | ReturnType<typeof orderActions.setTotalItemsAmount>
  | ReturnType<typeof orderActions.setOrderId>
  | ReturnType<typeof orderActions.setOrderProducts>
  | ReturnType<typeof orderActions.cleanCurrentOrder>;

export const getOrderItemsAction = (region: string, service: string, searchPrice: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi }
) => {
  try {
    dispatch(orderActions.setProductsPrice(0));
    dispatch(orderActions.setTotalItemsAmount(0));

    const changedRegion = region.toLowerCase();
    const changedService = service.toLowerCase().replaceAll(' ', '-');
    const { products } = await mainApi.getOrderItems(changedRegion, changedService);
    let mappedItems: RefactoredProduct[] = [];
    let { totalPrice, totalItemsAmount, productsPrice } = getState().order;

    products.forEach((item) => {
      const newItems = item.items.map((el: string) => ({ name: el, isChosen: true }));
      productsPrice += Number(item.price) * newItems.length;
      totalItemsAmount += newItems.length;
      mappedItems = [...mappedItems, {
        ...item,
        items: newItems
      }];
      console.log(mappedItems);
    });

    dispatch(orderActions.setProductsPrice(productsPrice));
    dispatch(orderActions.setTotalPrice(totalPrice + Number(searchPrice)));
    dispatch(orderActions.setTotalItemsAmount(totalItemsAmount));
    dispatch(orderActions.setProducts(mappedItems));
  } catch (error: any) {
    console.log(error);
  }
};

export const initializeOrderAction = (
  matter: string,
  description: string,
  region: string,
  service: string,
  searchPrice: string
): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const { user } = getState().user;

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: searchPrice,
      fulfilmentStatus: 'fulfiled',
      organisationId: user!.organisationId,
      products: [{
        productId: 1,
        name: `${region}: ${service} search`,
        price: searchPrice
      }]
    };

    const { id, products } = await mainApiProtected.placeOrder(order);
    dispatch(orderActions.setOrderProducts(products));
    dispatch(orderActions.setOrderId(id));
  } catch (error: any) {
    console.log(error);
  }
};

export const editOrderAction = (
  matter: string,
  description: string,
  region: string,
  service: string,
  searchPrice: string
): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const { totalPrice, orderId, orderProducts } = getState().order;
    const { user } = getState().user;

    if (!orderId) return;

    let newTotalPrice = totalPrice;
    let filteredProducts: (PlaceOrderProduct | RefactoredProduct)[] = [...orderProducts!];

    filteredProducts.push({
      productId: 2,
      name: `${region}: ${service} search`,
      price: searchPrice
    });
    newTotalPrice += Number(searchPrice);

    let products: PlaceOrderProduct[] = [];

    filteredProducts.forEach((product) => {
      if ('items' in product && product.items) {
        product.items.forEach((item: { isChosen: boolean, name: string }) => {
          products.push({
            productId: product.id,
            price: product.price,
            idNumber: item.name,
            body: 'something'
          });
        });
      } else products.push(product as PlaceOrderProduct);
    });

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: newTotalPrice.toFixed(2),
      fulfilmentStatus: 'fulfiled',
      products,
      organisationId: user!.organisationId
    };

    const { products: existedProducts } = await mainApiProtected.editOrder(orderId, order);
    dispatch(orderActions.setOrderProducts(existedProducts));
  } catch (error: any) {
    console.log(error);
  }
};

export const placeOrderAction = (
  matter: string,
  description: string,
  region: string,
  service: string
): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const {
      totalPrice,
      productsPrice,
      orderId,
      orderProducts,
      products
    } = getState().order;
    const { user } = getState().user;

    if (!orderId) return;

    let filteredProducts: PlaceOrderProduct[] = [...orderProducts!];

    products!.forEach((product) => {
      if (product.items) {
        product.items.forEach((item: { isChosen: boolean, name: string }) => {
          if (item.isChosen) {
            filteredProducts.push({
              productId: product.id,
              price: product.price,
              idNumber: item.name,
              body: 'something'
            });
          }
        });
      }
    });

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: (totalPrice + productsPrice).toFixed(2),
      fulfilmentStatus: 'fulfiled',
      products: filteredProducts,
      organisationId: user!.organisationId
    };

    await mainApiProtected.editOrder(orderId, order);
  } catch (error: any) {
    console.log(error);
  }
};
