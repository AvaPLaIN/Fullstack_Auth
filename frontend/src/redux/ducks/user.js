//* CONSTANTS
export const FETCH_USER_REQUEST = 'REDUX/USER/FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'REDUX/USER/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'REDUX/USER/FETCH_USER_FAILURE';

//* INIT
const initialState = {
  loading: false,
  user: {},
  error: 'undefined',
};

//* REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

//* ACTIONS
export const fetch_user_request = () => {};

//* EXPORT
export default reducer;
