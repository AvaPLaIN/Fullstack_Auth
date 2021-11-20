//* IMPORTS
import axios from 'axios';

//* CONSTANTS
const PROXY_URL = 'http://localhost:8800/api/auth';

//* SERVICES
export const register = async (credentials) => {
  try {
    const data = await axios.post(`${PROXY_URL}/register`, credentials);
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const data = await axios.post(`${PROXY_URL}/login`, credentials);
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = () => {};
