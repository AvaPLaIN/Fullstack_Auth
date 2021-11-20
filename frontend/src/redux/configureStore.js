//* IMPORTS
//     * REDUX
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

//     * REDUCERS
import userReducer from './ducks/user';

//* MIDDLEWARE
let middleware = [];
const loggerMiddleware = createLogger({});
if (process.env.NODE_ENV !== 'production')
  middleware = [...middleware, loggerMiddleware];

//* STATES
const reducer = combineReducers({
  user: userReducer,
});

//* STORE
const store = createStore(reducer, {}, applyMiddleware(...middleware));

//* EXPORTS
export default store;
