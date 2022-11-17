import { createActionCreators } from 'immer-reducer';

import { UserReducer } from '@/store/reducers/user';
import { AsyncAction } from '@/store/actions/common';
import { HandleToggle } from '@/hooks/useToggle';

export const userActions = createActionCreators(UserReducer);

export type UserActions = ReturnType<typeof userActions.setOrders>
  | ReturnType<typeof userActions.setMatters>
  | ReturnType<typeof userActions.setOrderDetails>
  | ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.setIsLoadingUser>
  | ReturnType<typeof userActions.setPriceList>
  | ReturnType<typeof userActions.setOrgUsers>
  | ReturnType<typeof userActions.logout>;

export const loginAction = (email: string, password: string, callback: () => void): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { accessToken, refreshToken } = await mainApi.login(email, password);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    callback();
  } catch (error: any) {
    console.log(error);
  }
};

export const getMeAction = (toggleIsFinished: HandleToggle): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const user = await mainApiProtected.getMe();

    dispatch(userActions.setUser(user));
    dispatch(userActions.setIsLoadingUser(false));
    toggleIsFinished(true);
  } catch (error: any) {
    console.log(error);
    dispatch(userActions.setIsLoadingUser(false));
    toggleIsFinished(true);
  }
};

export const getPriceListAction = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const orgId = getState().user.user!.id;
    const priceList = await mainApiProtected.getPriceList(orgId);

    dispatch(userActions.setPriceList(priceList));
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

export const getUsersByOrganizationAction = (id: number = 1): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const users = await mainApiProtected.getUsersByOrganization(id);
    dispatch(userActions.setOrgUsers(users));
  } catch (error: any) {
    console.log(error);
  }
};

export const logoutAction = (): AsyncAction => async (
  dispatch,
  _,
  { }
) => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(userActions.logout());
  } catch (error: any) {
    console.log(error);
  }
};
