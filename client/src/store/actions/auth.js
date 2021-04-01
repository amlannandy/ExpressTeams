import axios from '../../utils/axios';
import history from '../../utils/history';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const register = registerData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const res = await axios.post('/auth/register', registerData);
    const token = res.data.data;
    const user = await getCurrentUser(token);
    localStorage.setItem('express-token', token);
    dispatch({ type: REGISTER, payload: { token, user } });
    history.push('/');
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_AUTH_ERROR, payload: errorMessage });
  }
};

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const res = await axios.post('/auth/login', loginData);
    const token = res.data.data;
    const user = await getCurrentUser(token);
    localStorage.setItem('express-token', token);
    dispatch({ type: LOGIN, payload: { token, user } });
    history.push('/');
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_AUTH_ERROR, payload: errorMessage });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const token = localStorage.getItem('express-token');
    if (!token) {
      dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
    } else {
      const user = await getCurrentUser(token);
      dispatch({ type: AUTHENTICATE, payload: { token, user } });
    }
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('express-token');
  history.push('/login');
  dispatch({ type: LOGOUT });
};

export const setAuthError = message => dispatch => {
  dispatch({ type: SET_AUTH_ERROR, payload: message });
};

const getCurrentUser = async token => {
  try {
    const res = await axios.get('/auth/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res.data.data;
    return user;
  } catch (error) {
    return null;
  }
};
