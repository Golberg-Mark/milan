import { createActionCreators } from 'immer-reducer';

import { OrganisationsReducer } from '@/store/reducers/organisations';
import { AsyncAction } from '@/store/actions/common';

export const organisationsActions = createActionCreators(OrganisationsReducer);

export type OrganisationsActions = ReturnType<typeof organisationsActions.setOrganisations>;

export const getOrganisationsAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const organisations = await mainApiProtected.getOrganisations();

    organisations.map((org) => {
      const priceLists = [org.priceLists.find(el => el.isActive)];

      return {
        ...org,
        priceLists
      };
    })

    dispatch(organisationsActions.setOrganisations(organisations));
  } catch (error: any) {
    console.log(error);
  }
};
