import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import UserReducer from '@/store/reducers/user';
import OrderReducer from '@/store/reducers/order';
import OrganisationsReducer from '@/store/reducers/organisations';
import MainApi from '@/api/mainApi';
import { MainApiProtected } from '@/api/mainApiProtected';
import { UserActions } from '@/store/actions/userActions';
import { OrderActions } from '@/store/actions/orderActions';
import { OrganisationsActions } from '@/store/actions/organisationsActions';

const rootReducer = combineReducers({
  user: UserReducer,
  order: OrderReducer,
  organisations: OrganisationsReducer
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

export type Actions = UserActions | OrderActions | OrganisationsActions;

export default store;
