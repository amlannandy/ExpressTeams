import axios from '../../utils/axios';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const SET_TEAMS_ERROR = 'SET_TEAMS_ERROR';
export const TOGGLE_TEAMS_LOADING = 'TOGGLE_TEAMS_LOADING';

export const fetchTeams = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.get('/teams');
    const teams = res.data.data;
    dispatch({ type: FETCH_TEAMS, payload: teams });
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_TEAMS_ERROR, payload: errorMessage });
  }
};
