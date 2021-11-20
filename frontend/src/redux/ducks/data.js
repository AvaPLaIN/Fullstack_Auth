//* IMPORTS
//     * SERVICES
import { fetchData } from '../../services/data';

//* CONSTANTS
//     * DATA
export const FETCH_DATA_REQUEST = 'REDUX/DATA/FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'REDUX/DATA/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'REDUX/DATA/FETCH_DATA_FAILURE';

//* INIT
const initialState = {
  loading: false,
  data: [],
  error: '',
};

//* REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //     * REGISTER
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: '' };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, data: [], error: action.payload };

    default:
      return state;
  }
};

//* ACTIONS
//     * REGISTER
export const fetch_data_request = () => {
  return { type: FETCH_DATA_REQUEST };
};
export const fetch_data_success = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};
export const fetch_data_failure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};
export const fetch_data = (accessToken) => async (dispatch) => {
  dispatch(fetch_data_request());

  const data = await fetchData(accessToken);

  if (data?.error && !data?.success)
    return dispatch(fetch_data_failure(data?.error));

  return dispatch(fetch_data_success(data?.data));
};

//* EXPORT
export default reducer;
