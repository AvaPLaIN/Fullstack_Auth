//* IMPORTS
//     * SERVICES
import { login, register } from '../../services/user';

//* CONSTANTS
//     * REGISTER
export const USER_REGISTER_REQUEST = 'REDUX/USER/USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'REDUX/USER/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'REDUX/USER/USER_REGISTER_FAILURE';

//     * LOGIN
export const USER_LOGIN_REQUEST = 'REDUX/USER/USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'REDUX/USER/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'REDUX/USER/USER_LOGIN_FAILURE';

//     * LOGOUT
export const USER_LOGOUT = 'REDUX/USER/USER_LOGOUT';

//* INIT
const initialState = {
  loading: false,
  user: {},
  error: '',
  message: '',
};

//* REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //     * REGISTER
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //     * LOGIN
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: '' };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, user: {}, error: action.payload };

    default:
      return state;
  }
};

//* ACTIONS
//     * REGISTER
export const user_register_request = () => {
  return { type: USER_REGISTER_REQUEST };
};

export const user_register_success = (message) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: message,
  };
};

export const user_register_failure = (error) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error,
  };
};

export const user_register = (credentials) => async (dispatch) => {
  dispatch(user_register_request());

  const data = await register(credentials);

  if (data?.error && !data?.success)
    return dispatch(user_login_failure(data?.error));

  return dispatch(user_login_success(data?.data));
};

//     * LOGIN
export const user_login_request = () => {
  return { type: USER_LOGIN_REQUEST };
};

export const user_login_success = (user) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  };
};

export const user_login_failure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};

export const user_login = (credentials) => async (dispatch) => {
  dispatch(user_login_request());

  const user = await login(credentials);

  if (!user?.data && !user?.success)
    return dispatch(user_login_failure(user?.error));

  return dispatch(user_login_success(user.data.user));
};

//     * AUTH
export const user_auth_request = () => {};

export const user_auth_success = (user) => {};

export const user_auth_failure = (error) => {};

export const user_auth = (credentials) => async (dispatch) => {};

//* EXPORT
export default reducer;
