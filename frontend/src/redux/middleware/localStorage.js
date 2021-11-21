//* IMPORTS
import { USER_LOGIN_SUCCESS } from '../ducks/user';

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);

    if ([USER_LOGIN_SUCCESS].includes(result.type)) {
      localStorage.setItem('data', JSON.stringify(getState()));
    }

    return result;
  };
};

export const loadLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (!data || !Object.keys(data).length) return undefined;
  return { ...data, user: { ...data.user, isLoggedIn: false } };
};
