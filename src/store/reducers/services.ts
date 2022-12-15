import { IPinedServices } from '@/pages/AllServices';
import { ExistingRegions } from '@/utils/getRegionsData';
import LocalStorage from '@/utils/localStorage';
import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface IService {
  input1: string | null
  input2: string | null
  placeholder: string | null
  placeholder2: string | null
  region: ExistingRegions
  productId: string
  searchType: string
  supplier: string
}

interface ServicesState {
  services: IService[]
  servicesModal: boolean,
  isServicesLoading: boolean,
  pinedServices: IPinedServices
}

const InitialState: ServicesState = {
  services: [],
  isServicesLoading: false,
  servicesModal: false,
  pinedServices: LocalStorage.getPinedServices(),
};

export class ServicesReducer extends ImmerReducer<ServicesState> {
  setServices(services: IService[]) {
    this.draftState.services = services;
  }

  setIsServicesLoading(isServicesLoading: boolean) {
    this.draftState.isServicesLoading = isServicesLoading;
  }

  setServicesModal(servicesModal: boolean) {
    this.draftState.servicesModal = servicesModal;
  }

  setPinedServices(pinedServices: IPinedServices) {
    this.draftState.pinedServices = pinedServices;
  }
}

export default createReducerFunction(ServicesReducer, InitialState);
