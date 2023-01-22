const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        errorMessage: "no error",
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        errorMessage: " no error",
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        errorMessage: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        errorMessage: "no error",
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
