//* IMPORTS
//     * REDUX
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
  localStorageMiddleware,
  loadLocalStorage,
} from './middleware/localStorage';

//     * REDUCERS
import userReducer, { USER_LOGOUT } from './ducks/user';
import dataReducer from './ducks/data';

//* MIDDLEWARE
let middleware = [];
const loggerMiddleware = createLogger({});
if (process.env.NODE_ENV !== 'production')
  middleware = [...middleware, loggerMiddleware];
middleware = [...middleware, thunkMiddleware, localStorageMiddleware];

//* STATES
const appReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) return appReducer(undefined, action);

  return appReducer(state, action);
};

//* STORE
const store = createStore(
  rootReducer,
  loadLocalStorage(),
  applyMiddleware(...middleware)
);

//* EXPORTS
export default store;
