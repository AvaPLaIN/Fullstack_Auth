//* IMPORTS
import axios from 'axios';

//* CONSTANTS
const PROXY_URL = 'http://localhost:8800/api/data';

//* SERVICES
export const fetchData = async (accessToken) => {
  try {
    const data = await axios.get(`${PROXY_URL}/all`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};
