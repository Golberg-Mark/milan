import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { UsersReducer } from '@/store/reducers/users';

export const usersActions = createActionCreators(UsersReducer);

export type UsersActions = ReturnType<typeof usersActions.setUsers>;

export const getUsersAction = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const users = await mainApiProtected.getUsers();

    dispatch(usersActions.setUsers(users));
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};
