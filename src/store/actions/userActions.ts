import { createActionCreators } from 'immer-reducer';

import { IUpdatePasswordBody, UserReducer } from '@/store/reducers/user';
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
  | ReturnType<typeof userActions.setSelectedMatter>
  | ReturnType<typeof userActions.setPopup>
  | ReturnType<typeof userActions.logout>;

export const registerAction = (
  email: string,
  password: string
): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    await mainApi.register(email, password);
  } catch (error: any) {
    console.log(error);
  }
};

export const validateOtpAction = (
  email: string,
  otp: string
): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { access_token, refresh_token } = await mainApi.validateOtp(email, otp);

    localStorage.setItem('token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const loginAction = (
  email: string,
  password: string,
  rememberMe: boolean
): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { accessToken, refreshToken } = await mainApi.login(email, password);

    if (rememberMe) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getResetLinkAction = (
  email: string
): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    await mainApi.forgotPassword(email);
  } catch (error: any) {
    console.log(error);
  }
};

export const updatePasswordAction = (
  body: IUpdatePasswordBody
): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    await mainApiProtected.updatePassword(body);
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
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
    const orgId = getState().user.user!.organisations[0].id;
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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    dispatch(userActions.logout());
  } catch (error: any) {
    console.log(error);
  }
};
