//* IMPORTS
import { USER_LOGIN_SUCCESS } from '../ducks/user';

//     * SERVICES
import { verify } from '../../services/user';

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);

    if ([USER_LOGIN_SUCCESS].includes(result.type)) {
      localStorage.setItem('user', JSON.stringify(getState().user.user));
    }

    return result;
  };
};

export const loadLocalStorage = async () => {
  const user = await JSON.parse(localStorage.getItem('user'));
  if (!user || !Object.keys(user).length) return undefined;

  const data = await verify(user);
  console.log('localStorage: ', data);

  if (user) return { user };

  return undefined;
};
