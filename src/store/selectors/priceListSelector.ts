import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { IPriceList } from '@/store/reducers/priceList';

const userState = (state: State) => state.priceList;

export const selectPriceLists: Selector<State, IPriceList[] | null> = createSelector(
  userState,
  ({ priceLists }) => priceLists
);
