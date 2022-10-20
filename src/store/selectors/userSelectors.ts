import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { RefactoredProduct, User } from '@/store/reducers/user';

const userState = (state: State) => state.user;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
);

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectOrders: Selector<State, any[] | null> = createSelector(
  userState,
  ({ orders }) => orders
);

export const selectTotalPrice: Selector<State, number> = createSelector(
  userState,
  ({ totalPrice }) => totalPrice
);

export const selectProducts: Selector<State, RefactoredProduct[] | null> = createSelector(
  userState,
  ({ products }) => products
);
