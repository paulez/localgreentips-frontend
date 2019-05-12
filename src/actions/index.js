import api from '../api.js';

export const login = username => ({
  type: 'LOGIN',
  username
})

function requestTips() {
  return {
    type: 'REQUEST_TIPS'
  }
}

function loadTips (tips) {
  return {
    type: 'LOAD_TIPS',
    tips
  }
}

export const addTip = tip => ({
  type: 'ADD_TIP',
  tip
})

function fetchTips() { 
  return dispatch => {
    dispatch(requestTips)
    return api.get("tips/")
      .then(results => dispatch(loadTips(results.data.results)))
  }
}

function shouldFetchTips(state) {
  const tips = state.tips
  if (!tips) {
    return true
  } else if (tips.ifFetching) {
    return false
  } else {
    return tips.didInvalidate
  }
}

export function fetchTipsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTips(getState())) {
      return dispatch(fetchTips())
    }
  }
}
