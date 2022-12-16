import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { IAssignPriceList, PriceListReducer } from '@/store/reducers/priceList';
import { getOrganisationsAction, organisationsActions } from '@/store/actions/organisationsActions';

export const priceListActions = createActionCreators(PriceListReducer);

export type PriceListActions = ReturnType<typeof priceListActions.setPriceLists>;

export const getAllPriceListsAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const priceLists = await mainApiProtected.getPriceLists();
    dispatch(priceListActions.setPriceLists(priceLists));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const assignPriceListToOrganisationsAction = (
  ids: number[],
  priceListId: number,
  body: IAssignPriceList
): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    dispatch(organisationsActions.setIsLoading(true));

    for (let i = 0; i < ids.length; i++) {
      await mainApiProtected.assignPriceListToOrganisation(ids[i], priceListId, body);
    }

    await dispatch(getOrganisationsAction());
  } catch (error: any) {
    console.log(error);
    dispatch(organisationsActions.setIsLoading(false));
    return Promise.reject(error);
  }
};
