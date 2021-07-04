import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTHENTICATE,
  DELETE_ACCOUNT,
  SET_AUTH_ERROR,
  TOGGLE_AUTH_LOADING,
} from '../actions/auth';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case REGISTER:
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case LOGOUT:
    case DELETE_ACCOUNT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case TOGGLE_AUTH_LOADING:
      return {
        ...state,
        error: null,
        isLoading: payload,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
