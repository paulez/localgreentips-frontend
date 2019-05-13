function tips(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, 
  action
) {
  switch (action.type) {
    case 'REQUEST_TIPS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'LOAD_TIPS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.tips
      })
    default:
      return state
  }
}

export default tips
