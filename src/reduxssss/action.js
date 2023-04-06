import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';
export const getLogin = () => {
  return {
    type: LOGIN_SUCCESS
  };
};
export const getLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
