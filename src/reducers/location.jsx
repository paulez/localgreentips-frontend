function location(
  state = {
    latitude: 0.0,
    longitude: 0.0,
    isFetching: false,
    didLoad: false,
    didError: false,
    error: ""
  },
  action
) {
  switch (action.type) {
  case 'REQUEST_LOCATION':
    return {
      ...state,
      isFetching: true,
    };
  case 'SET_LOCATION':
    return Object.assign({}, state, {
      latitude: action.location.coords.latitude,
      longitude: action.location.coords.longitude,
      isFetching: false,
      didLoad: true,
      didError: false,
      error: ""
    });
  case 'ERROR_LOCATION':
    return {
      ...state,
      didError: true,
      error: action
    };
  default:
    return state;
  }
}

export default location;
