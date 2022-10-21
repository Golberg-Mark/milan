import { createActionCreators } from 'immer-reducer';

import { PlaceOrder, PlaceOrderProduct, RefactoredProduct, UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setOrders>
  | ReturnType<typeof userActions.setProducts>
  | ReturnType<typeof userActions.setTotalPrice>
  | ReturnType<typeof userActions.setTotalItemsAmount>
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

export const getOrderItemsAction = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApi }
) => {
  try {
    let items = await mainApi.getOrderItems();
    let mappedItems: RefactoredProduct[] = [];
    let totalPrice = getState().user.totalPrice;
    let totalItemsAmount = getState().user.totalItemsAmount;

    items.forEach((item) => {
      const newItems = item.items.map((el) => ({ name: el, isChosen: true }));
      totalPrice += item.price * newItems.length;
      totalItemsAmount += newItems.length;
      mappedItems = [...mappedItems, {
        ...item,
        items: newItems
      }]
    });

    dispatch(userActions.setTotalPrice(totalPrice));
    dispatch(userActions.setTotalItemsAmount(totalItemsAmount));
    dispatch(userActions.setProducts(mappedItems));
  } catch (error: any) {
    console.log(error);
  }
};

const initializeOrderAction = (
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

    const items = await mainApiProtected.placeOrder(order);
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
    const { totalPrice, products: p } = getState().user;

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
          price: product.price.toFixed(2),
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

    const items = await mainApiProtected.placeOrder(order);
  } catch (error: any) {
    console.log(error);
  }
};
