import axios from '../../utils/axios';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const SET_TEAMS_ERROR = 'SET_TEAMS_ERROR';
export const FETCH_ADMIN_TEAMS = 'FETCH_ADMIN_TEAMS';
export const FETCH_MEMBER_TEAMS = 'FETCH_MEMBER_TEAMS';
export const TOGGLE_TEAMS_LOADING = 'TOGGLE_TEAMS_LOADING';

export const fetchTeams = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.get('/teams');
    const teams = res.data.data;
    dispatch({ type: FETCH_TEAMS, payload: teams });
  } catch (error) {
    let errors;
    if (error.response) {
      errors = error.response.data.errors;
    }
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_TEAMS_ERROR, payload: errorMessage });
  }
};

export const fetchAdminTeams = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.get('/teams/admin');
    const teams = res.data.data;
    dispatch({ type: FETCH_ADMIN_TEAMS, payload: teams });
  } catch (error) {
    let errors;
    if (error.response) {
      errors = error.response.data.errors;
    }
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_TEAMS_ERROR, payload: errorMessage });
  }
};

export const fetchMemberTeams = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.get('/teams/member');
    const teams = res.data.data;
    dispatch({ type: FETCH_MEMBER_TEAMS, payload: teams });
  } catch (error) {
    let errors;
    if (error.response) {
      errors = error.response.data.errors;
    }
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_TEAMS_ERROR, payload: errorMessage });
  }
};
