import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { Matters, Order, OrderDetails, User } from '@/store/reducers/user';

const userState = (state: State) => state.user;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
);

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectOrders: Selector<State, Order[] | null> = createSelector(
  userState,
  ({ orders }) => orders
);

export const selectMatters: Selector<State, Matters | null> = createSelector(
  userState,
  ({ matters }) => matters
);

export const selectOrderDetails: Selector<State, OrderDetails | null> = createSelector(
  userState,
  ({ orderDetails }) => orderDetails
);
