//* IMPORTS
//     * REDUX
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//     * REDUCERS
import userReducer from './ducks/user';

//* MIDDLEWARE
let middleware = [];
const loggerMiddleware = createLogger({});
if (process.env.NODE_ENV !== 'production')
  middleware = [...middleware, loggerMiddleware];
middleware = [...middleware, thunkMiddleware];

//* STATES
const reducer = combineReducers({
  user: userReducer,
});

//* STORE
const store = createStore(reducer, {}, applyMiddleware(...middleware));

//* EXPORTS
export default store;
