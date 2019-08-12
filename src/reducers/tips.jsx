function tips(
  state = {
    isFetching: false,
    isValid: false,
    items: []
  }, 
  action
) {
  switch (action.type) {
  case 'REQUEST_TIPS':
    return {
      ...state,
      isFetching: true,
    };
  case 'LOAD_TIPS':
    return Object.assign({}, state, {
      isFetching: false,
      isValid: true,
      items: action.tips
    });
  case 'ADD_TIP':
    return {
      ...state,
      isFetching: false,
      items: state.items.concat(action.tip)
    };
  case 'INVALIDATE_TIPS':
    return {
      ...state,
      isValid: false
    };
  default:
    return state;
  }
}

export default tips;
