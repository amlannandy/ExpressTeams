import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTHENTICATE,
  DELETE_ACCOUNT,
  SET_AUTH_ERROR,
  TOGGLE_AUTH_LOADING,
  UPDATE_PASSWORD,
  UPDATE_INFO,
  SEND_PASSWORD_RESET_MAIL,
} from '../actions/auth';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  message: null,
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
        isAuthenticated: false,
        isLoading: false,
      };
    case UPDATE_INFO:
    case UPDATE_PASSWORD:
    case SEND_PASSWORD_RESET_MAIL:
      return {
        ...state,
        isLoading: false,
        message: payload,
        error: null,
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
