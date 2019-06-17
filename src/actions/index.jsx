import api from '../api';

export const login = username => ({
  type: 'LOGIN',
  username
})

export const logout = username => ({
  type: 'LOGOUT',
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
  if (tips.items === undefined || tips.items.length === 0) {
    return true
  } else if (tips.isFetching) {
    return false
  } else {
    return !tips.didLoalAll
  }
}

function fetchSingleTip(tipId) {
  return dispatch => {
    dispatch(requestTips)
    return api.get("tips/" + tipId)
      .then(results => dispatch(addTip(results.data)))
  }
}

function shouldFetchSingleTip(state, tipId) {
  const tips = state.tips;
  if (tips.items === undefined || tips.items.length === 0) {
    return true
  } else if (tips.items.find( tip => tip.id === tipId)) {
    return false
  } else {
    return true
  }
}

function fetchCurrentUser() {
  return dispatch => {
    return api.get("rest-auth/user/")
      .then(results => dispatch(login(results.data.username))) 
  }
}

function shouldFetchCurrentUser(state) {
  if (state.user.username) {
    return false;
  } else {
    return true;
  }
}

export function fetchTipsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTips(getState())) {
      return dispatch(fetchTips())
    }
  }
}

export function fetchSingleTipIfNeeded(tipId) {
  return (dispatch, getState) => {
    if (shouldFetchSingleTip(getState(), tipId)) {
      return dispatch(fetchSingleTip(tipId))
    }
  }
}

export function fetchCurrentUserIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCurrentUser(getState())) {
      return dispatch(fetchCurrentUser())
    }
  }
}
