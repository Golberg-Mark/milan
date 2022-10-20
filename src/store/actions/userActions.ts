import { createActionCreators } from 'immer-reducer';

import { PlaceOrder, RefactoredProduct, UserReducer } from '@/store/reducers/user';
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

export const placeOrderAction = (order: PlaceOrder): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const items = await mainApiProtected.placeOrder(order);
  } catch (error: any) {
    console.log(error);
  }
};
