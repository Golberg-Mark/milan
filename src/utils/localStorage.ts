import { IPinedServices } from "@/pages/AllServices";

export enum LocalKey {
  PinedServices = 'pined_services',
}

export default class LocalStorage {
  static getPinedServices(): IPinedServices {
    const pinedServices = JSON.parse(window.localStorage.getItem(LocalKey.PinedServices) || '{}');
    return pinedServices;
  }

  static setPinedServices(pinedServices: IPinedServices) {
    window.localStorage.setItem(LocalKey.PinedServices, JSON.stringify(pinedServices));
  }

  static clearByKey(key: LocalKey) {
    window.localStorage.removeItem(key);
  }

  static clear() {
    window.sessionStorage.clear();
  }
}
