function user(
  state = {
    didFetch: false,
    loggedIn: false,
    username: "",
    token: "",
    lastUpdate: null
  },
  action
) {
  switch (action.type) {
  case 'LOGIN':
    return {
      didFetch: true,
      loggedIn: true,
      username: action.username,
      token: action.token,
      lastUpdate: Date.now()
      };
  case 'LOGOUT':
    return {
      didFetch: true,
      loggedIn: false,
      username: "",
      token: "",
      lastUpdate: Date.now()
    };
  case 'UPDATE':
    return {
      ...state,
      didFetch: true,
      username: action.username,
      lastUpdate: Date.now()
    };
  default:
    return state;
  }
};

export default user;
