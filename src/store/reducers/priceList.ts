import { ImmerReducer, createReducerFunction } from 'immer-reducer';
import { Product } from '@/store/reducers/user';

export interface IAssignPriceList {
  effectiveFromDate: number
}

export interface IPriceList {
  id: number,
  isDefault: boolean,
  name: string,
  priceList: Product[]
}

interface PriceListState {
  priceLists: IPriceList[] | null
}

const InitialState: PriceListState = {
  priceLists: null
};

export class PriceListReducer extends ImmerReducer<PriceListState> {
  public setPriceLists(value: IPriceList[] | null) {
    this.draftState.priceLists = value;
  }
}

export default createReducerFunction(PriceListReducer, InitialState);
