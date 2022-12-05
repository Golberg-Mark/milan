import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { IPopupMessage, Matters, Order, OrderDetails, OrganizationUser, Product, User } from '@/store/reducers/user';

const userState = (state: State) => state.user;

export const selectUser: Selector<State, User | null> = createSelector(
  userState,
  ({ user }) => user
);

export const selectIsLoadingUser: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoadingUser }) => isLoadingUser
);

export const selectPriceList: Selector<State, Product[] | null> = createSelector(
  userState,
  ({ priceList }) => priceList
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

export const selectOrganizationUsers: Selector<State, OrganizationUser[] | null> = createSelector(
  userState,
  ({ orgUsers }) => orgUsers
);

export const selectSelectedMatter: Selector<State, string | null> = createSelector(
  userState,
  ({ selectedMatter }) => selectedMatter
);

export const selectPopup: Selector<State, IPopupMessage | null> = createSelector(
  userState,
  ({ popup }) => popup
);
