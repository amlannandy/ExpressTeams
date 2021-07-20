import {
  FETCH_TEAMS,
  SET_TEAMS_ERROR,
  FETCH_ADMIN_TEAMS,
  FETCH_MEMBER_TEAMS,
  TOGGLE_TEAMS_LOADING,
  GET_TEAM,
  UPDATE_TEAM,
} from '../actions/teams';

const initialState = {
  teams: [],
  team: null,
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TEAMS:
    case FETCH_ADMIN_TEAMS:
    case FETCH_MEMBER_TEAMS:
      return {
        ...state,
        teams: payload,
        isLoading: false,
        error: null,
      };
    case SET_TEAMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case TOGGLE_TEAMS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: payload,
      };
    case GET_TEAM:
    case UPDATE_TEAM:
      return {
        ...state,
        error: null,
        isLoading: false,
        team: payload,
      };
    default:
      return state;
  }
};

export default reducer;
