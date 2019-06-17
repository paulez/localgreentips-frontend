function tips(
  state = {
    isFetching: false,
    didLoadAll: false,
    items: []
  }, 
  action
) {
  switch (action.type) {
    case 'REQUEST_TIPS':
      return {
        ...state,
        isFetching: true,
      }
    case 'LOAD_TIPS':
      return Object.assign({}, state, {
        isFetching: false,
        didLoadAll: true,
        items: action.tips
      })
    case 'ADD_TIP':
      return {
        ...state,
        isFetching: false,
        items: state.items.concat(action.tip)
      }
    default:
      return state
  }
}

export default tips
