import { ImmerReducer, createReducerFunction } from 'immer-reducer';
import { Roles } from '@/store/reducers/user';

export interface IOrganisationUser {
  email: string,
  isEmailVerified: boolean,
  role: Roles,
  id: number,
  roleWithinOrganisation: Roles,
  name: string,
}

interface UsersState {
  users: IOrganisationUser[] | null
}


const InitialState: UsersState = {
  users: null
};

export class UsersReducer extends ImmerReducer<UsersState> {
  public setUsers(value: IOrganisationUser[] | null) {
    this.draftState.users = value;
  }
}

export default createReducerFunction(UsersReducer, InitialState);
