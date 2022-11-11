import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { Product, ProductWithMatchedPriceList } from '@/store/reducers/order';

const orderState = (state: State) => state.order;

export const selectMatter: Selector<State, string> = createSelector(
  orderState,
  ({ matter }) => matter
);

export const selectDescription: Selector<State, string> = createSelector(
  orderState,
  ({ description }) => description
);

export const selectTotalItemsAmount: Selector<State, number> = createSelector(
  orderState,
  ({ totalItemsAmount }) => totalItemsAmount
);

export const selectProductsPrice: Selector<State, number> = createSelector(
  orderState,
  ({ productsPrice }) => productsPrice
);

export const selectTotalPrice: Selector<State, number> = createSelector(
  orderState,
  ({ totalPrice }) => totalPrice
);

export const selectProducts: Selector<State, ProductWithMatchedPriceList[] | null> = createSelector(
  orderState,
  ({ products }) => products
);

export const selectOrderId: Selector<State, string | null> = createSelector(
  orderState,
  ({ orderId }) => orderId
);

export const selectIsProductsLoading: Selector<State, boolean> = createSelector(
  orderState,
  ({ isProductsLoading }) => isProductsLoading
);
