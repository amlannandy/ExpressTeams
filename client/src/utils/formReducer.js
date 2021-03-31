const formReducer = (state, action) => {
  return {
    ...state,
    [action.target.name]: action.target.value,
  };
};

export default formReducer;
