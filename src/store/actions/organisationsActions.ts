import { createActionCreators } from 'immer-reducer';

import {
  ICreateOrganisation,
  IOrganisation,
  OrganisationsReducer
} from '@/store/reducers/organisations';
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

export const editOrganisationsAction = (ids: number[]): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const { organisations } = getState().organisations;

    if (organisations) {
      const orgs = organisations
        .filter((el) => ids.find((id) => id === el.id))
        .map((el) => ({
          id: el.id,
          name: el.name,
          isActive: !el.isActive
        }));

      const results: IOrganisation[] = [];

      for (const { id, name, isActive } of orgs) {
        const organisation = await mainApiProtected.editOrganisation(id, { name, isActive });
        results.push(organisation);
      }

      dispatch(organisationsActions.setOrganisations(organisations!.map((el) => {
        const founded = results.find((org) => org.id === el.id);
        return founded ? founded : el;
      })));
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const createOrganisationAction = (body: ICreateOrganisation): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const added = await mainApiProtected.createOrganisation(body);

    const organisations = getState().organisations.organisations || [];
    dispatch(organisationsActions.setOrganisations([...organisations, added]));
  } catch (error: any) {
    console.log(error);
  }
};
