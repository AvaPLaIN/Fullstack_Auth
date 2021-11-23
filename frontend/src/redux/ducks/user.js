//* IMPORTS
//     * LIBRARIES
import decode from 'jwt-decode';

//     * SERVICES
import {
  login,
  register,
  verify,
  resetPassword,
  requestPassword,
  validate,
} from '../../services/user';

//* CONSTANTS
//     * REGISTER
export const USER_REGISTER_REQUEST = 'REDUX/USER/USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'REDUX/USER/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'REDUX/USER/USER_REGISTER_FAILURE';

//     * LOGIN
export const USER_LOGIN_REQUEST = 'REDUX/USER/USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'REDUX/USER/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'REDUX/USER/USER_LOGIN_FAILURE';

//     * AUTH
export const USER_AUTH_REQUEST = 'REDUX/USER/USER_AUTH_REQUEST';
export const USER_AUTH_SUCCESS = 'REDUX/USER/USER_AUTH_SUCCESS';
export const USER_AUTH_FAILURE = 'REDUX/USER/USER_AUTH_FAILURE';

//     * VALIDATE USER
export const USER_VALIDATE_REQUEST = 'REDUX/USER/USER_VALIDATE_REQUEST';
export const USER_VALIDATE_SUCCESS = 'REDUX/USER/USER_VALIDATE_SUCCESS';
export const USER_VALIDATE_FAILURE = 'REDUX/USER/USER_VALIDATE_FAILURE';

//     * LOGOUT
export const USER_LOGOUT = 'REDUX/USER/USER_LOGOUT';

//     * RESET PASSWORD
export const USER_RESET_PASSWORD_REQUEST =
  'REDUX/USER/USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_SUCCESS =
  'REDUX/USER/USER_RESET_PASSWORD_SUCCESS';
export const USER_RESET_PASSWORD_FAILURE =
  'REDUX/USER/USER_RESET_PASSWORD_FAILURE';

//     * REQUEST NEW PASSWORD
export const USER_REQUEST_PASSWORD_REQUEST =
  'REDUX/USER/USER_REQUEST_PASSWORD_REQUEST';
export const USER_REQUEST_PASSWORD_SUCCESS =
  'REDUX/USER/USER_REQUEST_PASSWORD_SUCCESS';
export const USER_REQUEST_PASSWORD_FAILURE =
  'REDUX/USER/USER_REQUEST_PASSWORD_FAILURE';

//     * RESET REPORTS
export const USER_RESET_REPORTS = 'REDUX/USER/USER_RESET_REPORTS';

//* INIT
const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
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
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
        isLoggedIn: false,
      };

    //     * AUTH
    case USER_AUTH_REQUEST:
      return { ...state, loading: true };
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
        isLoggedIn: true,
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
        isLoggedIn: false,
      };

    //     * VALIDATE USER
    case USER_VALIDATE_REQUEST:
      return { ...state, loading: true };
    case USER_VALIDATE_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_VALIDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //     * RESET PASSWORD
    case USER_RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //     * REQUEST PASSWORD
    case USER_REQUEST_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case USER_REQUEST_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_REQUEST_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //     * RESET REPORTS
    case USER_RESET_REPORTS:
      return { ...state, error: '', message: '' };

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

  reset_reports(dispatch, 5000);

  if (data?.error && !data?.success)
    return dispatch(user_register_failure(data?.error));

  return dispatch(user_register_success(data?.data));
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

  reset_reports(dispatch, 5000);

  if (!user?.data && !user?.success)
    return dispatch(user_login_failure(user.error));

  return dispatch(user_login_success(user.data.user));
};

//     * LOGOUT
export const user_logout_success = () => {
  return { type: USER_LOGOUT };
};
export const user_logout = () => async (dispatch) => {
  localStorage.removeItem('data');
  dispatch(user_logout_success());
};

//     * AUTH
export const user_auth_request = () => {
  return { type: USER_AUTH_REQUEST };
};
export const user_auth_success = (user) => {
  return {
    type: USER_AUTH_SUCCESS,
    payload: user,
  };
};
export const user_auth_failure = (error) => {
  return {
    type: USER_AUTH_FAILURE,
    payload: error,
  };
};
export const user_auth = (user) => async (dispatch) => {
  dispatch(user_auth_request());

  const verifiedUser = await verify(user);

  reset_reports(dispatch, 5000);

  if (!verifiedUser?.data && !verifiedUser?.success) {
    dispatch(user_logout());
    return dispatch(user_auth_failure(verifiedUser.error));
  }

  const refreshTokens = () => {
    const timeout = setTimeout(() => {
      dispatch(user_auth(user));
    }, (Math.floor(decode(verifiedUser.data.user.accessToken).exp - Date.now() / 1000) - 3600) * 1000);

    return () => clearTimeout(timeout);
  };

  refreshTokens();

  return dispatch(user_auth_success(verifiedUser.data.user));
};

//     * VALIDATE USER
export const user_validate_request = () => {
  return {
    type: USER_VALIDATE_REQUEST,
  };
};
export const user_validate_success = (message) => {
  return {
    type: USER_VALIDATE_SUCCESS,
    payload: message,
  };
};
export const user_validate_failure = (error) => {
  return {
    type: USER_VALIDATE_FAILURE,
    payload: error,
  };
};
export const user_validate = (token) => async (dispatch) => {
  dispatch(user_validate_request());

  const validatedUser = await validate(token);

  reset_reports(dispatch, 5000);

  if (!validatedUser?.data && !validatedUser?.success) {
    return dispatch(user_validate_failure(validatedUser.error));
  }

  return dispatch(user_validate_success(validatedUser.data));
};

//     * RESET PASSWORD
export const user_reset_password_request = () => {
  return {
    type: USER_RESET_PASSWORD_REQUEST,
  };
};
export const user_reset_password_success = (message) => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};
export const user_reset_password_failure = (error) => {
  return {
    type: USER_RESET_PASSWORD_FAILURE,
    payload: error,
  };
};
export const user_reset_password =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(user_reset_password_request());

    const newPassword = await resetPassword(token, password, confirmPassword);

    reset_reports(dispatch, 5000);

    if (!newPassword?.data && !newPassword?.success) {
      return dispatch(user_reset_password_failure(newPassword.error));
    }

    return dispatch(user_reset_password_success(newPassword.data));
  };

//     * REQUEST PASSWORD
export const user_request_password_request = () => {
  return {
    type: USER_REQUEST_PASSWORD_REQUEST,
  };
};
export const user_request_password_success = (message) => {
  return {
    type: USER_REQUEST_PASSWORD_SUCCESS,
    payload: message,
  };
};
export const user_request_password_failure = (error) => {
  return {
    type: USER_REQUEST_PASSWORD_FAILURE,
    payload: error,
  };
};
export const user_request_password = (email) => async (dispatch) => {
  dispatch(user_request_password_request());

  const requestPasswordData = await requestPassword(email);

  reset_reports(dispatch, 5000);

  if (!requestPasswordData?.data && !requestPasswordData?.success) {
    return dispatch(user_request_password_failure(requestPasswordData.error));
  }

  return dispatch(user_request_password_success(requestPasswordData.data));
};

//     * RESET REPORTS
const reset_reports = (dispatch, time) => {
  const timeout = setTimeout(() => {
    dispatch(user_reset_reports());
  }, time);

  return () => clearTimeout(timeout);
};

export const user_reset_reports = () => {
  return {
    type: USER_RESET_REPORTS,
  };
};

//* EXPORT
export default reducer;
