import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';
const initialState = {
  isAuthenticated: false,
  user: { email: 'user@gmail.com', pass: 'asdf' }
};
// Reducers
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
export default AuthReducer;
