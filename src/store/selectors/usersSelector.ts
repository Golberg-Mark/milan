import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { IOrganisationUser } from '@/store/reducers/users';

const userState = (state: State) => state.users;

export const selectUsers: Selector<State, IOrganisationUser[] | null> = createSelector(
  userState,
  ({ users }) => users
);
