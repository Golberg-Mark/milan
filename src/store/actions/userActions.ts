import { createActionCreators } from 'immer-reducer';

import user, { PlaceOrder, PlaceOrderProduct, RefactoredProduct, UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setOrders>
  | ReturnType<typeof userActions.setProducts>
  | ReturnType<typeof userActions.setProductsPrice>
  | ReturnType<typeof userActions.setTotalPrice>
  | ReturnType<typeof userActions.setTotalItemsAmount>
  | ReturnType<typeof userActions.setOrderId>
  | ReturnType<typeof userActions.setUser>;

export const getMeAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const user = await mainApi.getMe();

    dispatch(userActions.setUser(user));
  } catch (error: any) {
    console.log(error);
  }
};

export const getOrdersAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const orders = await mainApi.getOrders();

    dispatch(userActions.setOrders(orders));
  } catch (error: any) {
    console.log(error);
  }
};

export const getOrderItemsAction = (region: string, service: string, searchPrice: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi }
) => {
  try {
    dispatch(userActions.setProductsPrice(0));
    dispatch(userActions.setTotalItemsAmount(0));

    const changedRegion = region.toLowerCase();
    const changedService = service.toLowerCase().replaceAll(' ', '-');
    const { products } = await mainApi.getOrderItems(changedRegion, changedService);
    let mappedItems: RefactoredProduct[] = [];
    let { totalPrice, productsPrice } = getState().user;
    let totalItemsAmount = getState().user.totalItemsAmount;

    products.forEach((item) => {
      const newItems = item.items.map((el) => ({ name: el, isChosen: true }));
      productsPrice += Number(item.price) * newItems.length;
      totalItemsAmount += newItems.length;
      mappedItems = [...mappedItems, {
        ...item,
        items: newItems
      }];
      console.log(mappedItems);
    });

    dispatch(userActions.setProductsPrice(productsPrice));
    dispatch(userActions.setTotalPrice(totalPrice + Number(searchPrice)));
    dispatch(userActions.setTotalItemsAmount(totalItemsAmount));
    dispatch(userActions.setProducts(mappedItems));
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
  _,
  { mainApiProtected }
) => {
  try {
    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: searchPrice,
      fulfilmentStatus: 'fulfiled',
      products: [{
        productId: 1,
        name: `${region}: ${service} search`,
        price: searchPrice
      }]
    };

    const { id } = await mainApiProtected.placeOrder(order);
    dispatch(userActions.setOrderId(id));
  } catch (error: any) {
    console.log(error);
  }
};

export const editOrderAction = (
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
    const { totalPrice, orderId, products: p } = getState().user;

    if (!orderId) return;

    let filteredProducts: RefactoredProduct[] = [];

    p!.forEach((product) => {
      const filteredItems = product.items?.filter((item) => item.isChosen);

      if (filteredItems.length) filteredProducts = [...filteredProducts, {
        ...product,
        items: filteredItems
      }]
    });

    let products: PlaceOrderProduct[] = [];

    filteredProducts.forEach((product) => {
      product.items.forEach((item) => {
        products.push({
          productId: product.id,
          price: product.price,
          idNumber: item.name,
          body: 'something'
        });
      });
    });

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: totalPrice.toFixed(2),
      fulfilmentStatus: 'fulfiled',
      products
    };

    const { id } = await mainApiProtected.editOrder(orderId, order);
  } catch (error: any) {
    console.log(error);
  }
};
