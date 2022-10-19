import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface Order {
  matter: string,
  service: string,
  description: string,
  status: string,
  user: number,
  date: string
}

export interface User {
  id: number,
  name: string,
  email: string,
  photo: string
}

interface UserState {
  user: User | null,
  isLoggedIn: boolean,
  orders: Order[] | null
}

const InitialState: UserState = {
  user: null,
  isLoggedIn: true,
  orders: null
};

export class UserReducer extends ImmerReducer<UserState> {
  public setUser(value: User | null) {
    this.draftState.user = value;
  }

  public setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;
  }

  public setOrders(value: Order[] | null) {
    this.draftState.orders = value;
  }
}

export default createReducerFunction(UserReducer, InitialState);
