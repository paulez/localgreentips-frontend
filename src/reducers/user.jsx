function user(
  state = {
    didFetch: false,
    loggedIn: false,
    username: "",
    token: ""
  },
  action
) {
  switch (action.type) {
  case 'LOGIN':
    return {
      didFetch: true,
      loggedIn: true,
      username: action.username,
      token: action.token
      };
  case 'LOGOUT':
    return {
      didFetch: true,
      loggedIn: false,
      username: "",
      token: ""
    };
  default:
    return state;
  }
};

export default user;
