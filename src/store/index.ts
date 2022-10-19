import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import UserReducer from '@/store/reducers/user';
import MainApi from '@/api/mainApi';
import { MainApiProtected } from '@/api/mainApiProtected';
import { UserActions } from '@/store/actions/userActions';

const rootReducer = combineReducers({
  user: UserReducer
});

export const api = {
  mainApi: MainApi.getInstance(),
  mainApiProtected: MainApiProtected.getInstance()
};

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const enhancer = composeEnhancer(
  applyMiddleware(thunk.withExtraArgument(api))
);

const store = createStore(rootReducer, enhancer);

export type State = ReturnType<typeof rootReducer>;

export type Actions = UserActions;

export default store;
