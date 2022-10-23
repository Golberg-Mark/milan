import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { RefactoredProduct } from '@/store/reducers/order';

const orderState = (state: State) => state.order;

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

export const selectProducts: Selector<State, RefactoredProduct[] | null> = createSelector(
  orderState,
  ({ products }) => products
);

export const selectOrderId: Selector<State, number | null> = createSelector(
  orderState,
  ({ orderId }) => orderId
);