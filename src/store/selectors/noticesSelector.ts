import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { INotice } from '@/store/reducers/notices';

const userState = (state: State) => state.notices;

export const selectNotices: Selector<State, INotice[] | null> = createSelector(
  userState,
  ({ notices }) => notices
);

export const selectActiveNotices: Selector<State, INotice[] | null> = createSelector(
  userState,
  ({ activeNotices }) => activeNotices
);
