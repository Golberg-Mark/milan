import { createActionCreators } from 'immer-reducer';

import { UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setOrders>
  | ReturnType<typeof userActions.setMatters>
  | ReturnType<typeof userActions.setOrderDetails>
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

    let matters: any = {};

    orders.forEach((order) => {
      if (!matters[order.matter]) {
        matters[order.matter] = {
          matter: order.matter,
          description: order.description,
          lastOrdered: order.date,
          ordersAmount: 1,
          pending: order.status === 'open' ? 1 : 0,
          orders: [order]
        }
      } else {
        const matter = matters[order.matter];

        matters[order.matter].lastOrdered = matter.lastOrdered > order.date ? matter.lastOrdered : order.date;
        matters[order.matter].ordersAmount = matter.ordersAmount + 1;
        matters[order.matter].pending = matter.pending + Number(order.status === 'open');
        matters[order.matter].orders = [...matter.orders, order];
      }
    });

    dispatch(userActions.setMatters(matters));
  } catch (error: any) {
    console.log(error);
  }
};

export const getOrderDetailsAction = (id: string): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const orderDetails = await mainApiProtected.getOrderDetails(id);

    dispatch(userActions.setOrderDetails(orderDetails));
  } catch (error: any) {
    console.log(error);
  }
};
