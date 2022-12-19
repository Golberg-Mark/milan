import { createActionCreators } from 'immer-reducer';

import {
  ICreateOrganisation,
  OrganisationsReducer
} from '@/store/reducers/organisations';
import { AsyncAction } from '@/store/actions/common';
import { userActions } from '@/store/actions/userActions';
import { PopupTypes } from '@/store/reducers/user';

export const organisationsActions = createActionCreators(OrganisationsReducer);

export type OrganisationsActions = ReturnType<typeof organisationsActions.setOrganisations>
 | ReturnType<typeof organisationsActions.setOrganisationDetails>
 | ReturnType<typeof organisationsActions.setIsLoading>;

export const getOrganisationsAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    dispatch(organisationsActions.setIsLoading(true));
    const organisations = await mainApiProtected.getOrganisations();

    dispatch(organisationsActions.setOrganisations(organisations));
    dispatch(organisationsActions.setIsLoading(false));
  } catch (error: any) {
    console.log(error);
    dispatch(userActions.setPopup({
      mainText: 'Error',
      additionalText: error.message,
      type: PopupTypes.ERROR
    }));
    dispatch(organisationsActions.setIsLoading(false));
  }
};

export const editOrganisationsAction = (ids: number[]): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    dispatch(organisationsActions.setIsLoading(true));

    const organisations = getState().organisations.organisations || [];
    dispatch(organisationsActions.setOrganisations(null));
    const tempOrganisation = [...organisations];

    if (tempOrganisation) {
      const orgs = tempOrganisation
        .filter((el) => ids.find((id) => id === el.id))
        .map((el) => ({
          id: el.id,
          name: el.name,
          isActive: !el.isActive
        }));

      for (const { id, name, isActive } of orgs) {
        await mainApiProtected.editOrganisation(id, { name, isActive });
      }

      await dispatch(getOrganisationsAction());
      dispatch(organisationsActions.setIsLoading(false));
    }
  } catch (error: any) {
    console.log(error);
    dispatch(organisationsActions.setIsLoading(false));
    return Promise.reject(error);
  }
};

export const createOrganisationAction = (body: ICreateOrganisation): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    dispatch(organisationsActions.setIsLoading(true));
    await mainApiProtected.createOrganisation(body);
    await dispatch(getOrganisationsAction());

    dispatch(organisationsActions.setIsLoading(false));
  } catch (error: any) {
    console.log(error);
    dispatch(organisationsActions.setIsLoading(false));
    return Promise.reject(error);
  }
};

export const getOrganisationDetailsAction = (id: number): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const organisation = await mainApiProtected.getOrganisation(id);

    console.log(organisation);
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};
