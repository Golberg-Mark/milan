import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { IService } from '../reducers/services';
import { IPinedServices } from '@/pages/AllServices';

const userState = (state: State) => state.services;

export const selectServices: Selector<State, IService[]> = createSelector(
  userState,
  ({ services }) => services
);

export const selectServicesModal: Selector<State, boolean> = createSelector(
  userState,
  ({ servicesModal }) => servicesModal
);

export const selectIsServicesLoading: Selector<State, boolean> = createSelector(
  userState,
  ({ isServicesLoading }) => isServicesLoading
);

export const selectPinedServices: Selector<State, IPinedServices> = createSelector(
  userState,
  ({ pinedServices }) => pinedServices
);


