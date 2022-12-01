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

export interface IEditOrganisation {
  id: number,
  name: string,
  isActive: boolean
}

export interface ICreateOrganisation {
  name: string
}

interface OrganisationsState {
  organisations: IOrganisation[] | null,
  isLoading: boolean
}

const InitialState: OrganisationsState = {
  organisations: null,
  isLoading: false
};

export class OrganisationsReducer extends ImmerReducer<OrganisationsState> {
  public setOrganisations(value: IOrganisation[] | null) {
    this.draftState.organisations = value;
  }

  public setIsLoading(value: boolean) {
    this.draftState.isLoading = value;
  }
}

export default createReducerFunction(OrganisationsReducer, InitialState);
