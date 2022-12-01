import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { IOrganisation } from '@/store/reducers/organisations';

const userState = (state: State) => state.organisations;

export const selectOrganisations: Selector<State, IOrganisation[] | null> = createSelector(
  userState,
  ({ organisations }) => organisations
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoading }) => isLoading
);
