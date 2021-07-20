import axios from '../../utils/axios';
import history from '../../utils/history';

export const GET_TEAM = 'GET_TEAM';
export const UPDATE_TEAM = 'UPDATE_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';
export const CREATE_TEAM = 'CREATE_TEAM';
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

export const createTeam = (postData, closeModal) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.post('/teams', postData);
    const message = res.data.msg;
    dispatch({ type: CREATE_TEAM, payload: message });
    closeModal();
    dispatch(fetchTeams());
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

export const getTeam = id => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.get(`/teams/${id}`);
    const data = res.data.data;
    dispatch({ type: GET_TEAM, payload: data });
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

export const updateTeam = (id, putData, closeModal) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.put(`/teams/${id}`, putData);
    const data = res.data.data;
    dispatch({ type: UPDATE_TEAM, payload: data });
    closeModal();
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

export const deleteTeam = (id, closeModal) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_TEAMS_LOADING, payload: true });
    const res = await axios.delete(`/teams/${id}`);
    const data = res.data.msg;
    dispatch({ type: DELETE_TEAM, payload: data });
    closeModal();
    history.replace('/');
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
