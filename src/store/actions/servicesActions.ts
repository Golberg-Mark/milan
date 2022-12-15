import { createActionCreators } from 'immer-reducer';

import { ServicesReducer } from '@/store/reducers/services';
import { AsyncAction } from '@/store/actions/common';

export const servicesActions = createActionCreators(ServicesReducer);

export type ServicesActions =
  | ReturnType<typeof servicesActions.setServices>
  | ReturnType<typeof servicesActions.setPinedServices>
  | ReturnType<typeof servicesActions.setIsServicesLoading>
  | ReturnType<typeof servicesActions.setServicesModal>;

export const getServices = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    dispatch(servicesActions.setIsServicesLoading(true))

    const services = await mainApiProtected.getServices()

    dispatch(servicesActions.setServices(services))

    dispatch(servicesActions.setIsServicesLoading(false))
  } catch (error: any) {
    console.error(error);
  }
};
