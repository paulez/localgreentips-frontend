function cities(
  state = {
    isFetching: false,
    isValid: false,
    items: []
  },
  action
) {
  switch (action.type) {
  case 'REQUES_CITIES':
    return {
      ...state,
      isFetching: true,
    };
  case 'LOAD_CITIES':
    return Object.assign({}, state, {
      isFetching: false,
      isValid: true,
      items: action.cities
    });
  case 'INVALIDATE_CITIES':
    return {
      ...state,
      isValid: false
    };
  default:
    return state;
  }
}

export default cities;
