import { ImmerReducer, createReducerFunction } from 'immer-reducer';

interface IPriceList {
  name: string,
  isActive: boolean,
  priceListId: number,
  organisationId: number,
  effectiveFromDate: string
}

export interface IOrganisation {
  id: number,
  name: string,
  isActive: boolean,
  lastOrderDate: string,
  creditLimit: number,
  paymentTerms: string,
  priceLists: IPriceList[]
}

interface OrganisationsState {
  organisations: IOrganisation[] | null
}

const InitialState: OrganisationsState = {
  organisations: null
};

export class OrganisationsReducer extends ImmerReducer<OrganisationsState> {
  public setOrganisations(value: IOrganisation[] | null) {
    this.draftState.organisations = value;
  }
}

export default createReducerFunction(OrganisationsReducer, InitialState);
