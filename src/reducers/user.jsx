function user(
  state = {
    didFetch: false,
    loggedIn: false,
    username: ""
  },
  action
) {
  switch (action.type) {
  case 'LOGIN':
    return {
      didFetch: true,
      loggedIn: true,
      username: action.username
      };
  case 'LOGOUT':
    return {
      didFetch: true,
      loggedIn: false,
      username: ""
    };
  default:
    return state;
  }
};

export default user;

