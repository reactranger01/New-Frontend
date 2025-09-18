import toast from 'react-hot-toast';
import { removeAuthCookie } from './apiHandlers';
import Cookies from 'js-cookie';
export const logout = () => {
  Cookies.remove('__users__isLoggedIn');
  Cookies.remove('test__users__isLoggedIn');
  Cookies.remove('development__users__isLoggedIn');
  localStorage.removeItem('__users__isLoggedIn');
  localStorage.removeItem('lotus_userID');
  window.location.reload();
  removeAuthCookie();
  toast.success('Logged Out Successfully...');
};
