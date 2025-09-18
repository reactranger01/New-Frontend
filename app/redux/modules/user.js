import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { SET_USER, CLEANUP } from '../actions/actionConstants';
import { logout } from '@/utils/logout';
// import Cookies from 'js-cookie';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUser = async () => {
  const islogin = isLoggedIn();
  if (islogin) {
    try {
      // Add a 1-second delay before making the API call
      await delay(1000);
      const response = await getAuthData('/user/get-user-details');
      localStorage.setItem('lotus_userID', response?.data?.data?.id);
      if (response?.status === 200) {
        return response?.data?.data;
      } else if (response?.status == 403) {
        logout();
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
const initialState = {};

const userModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CLEANUP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userModule;
