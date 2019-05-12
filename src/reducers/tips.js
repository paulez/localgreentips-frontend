const tips = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TIPS':
      return {
        items: action.tips
      };
    default:
      return state
  }
}

export default tips
