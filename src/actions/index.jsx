import api from '../api';
import { invalidateAndUpdateCities } from './cities';

const TIP_EXPIRATION = 1 * 60 * 1000;
const USER_EXPIRATION = 1 * 60 * 1000;

export const login = (username, token) => ({
  type: 'LOGIN',
  username,
  token
});

export const userUpdate = (username) => ({
  type: 'UPDATE',
  username
});

export const logout = () => ({
  type: 'LOGOUT'
});

function requestTips() {
  return {
    type: 'REQUEST_TIPS'
  };
}

function invalidateTips() {
  return {
    type: 'INVALIDATE_TIPS'
  };
}

function loadTips (tips) {
  return {
    type: 'LOAD_TIPS',
    tips
  };
}

export const addTip = tip => ({
  type: 'ADD_TIP',
  tip
});

export const locationError = error => ({
  type: 'ERROR_LOCATION',
  error
});

export const setLocation = location => ({
  type: 'SET_LOCATION',
  location
});


function fetchTips(state) {
  return dispatch => {
    dispatch(requestTips);
    var args;
    if(state.location.didLoad) {
      args = {
	params: {
	  latitude: state.location.latitude,
	  longitude: state.location.longitude
	}
      };
    } else {
      args = {};
    }
    return api.get("tips/", args)
      .then(results => dispatch(loadTips(results.data.results)))
      .catch(error => console.log(error));
  };
}

function shouldFetchTips(state) {
  const tips = state.tips;
  if (tips.isFetching) {
    return false;
  }
  else if (tips.items === undefined ||
           tips.items.length === 0 ||
           tips.lastUpdate === null ||
           tips.lastUpdate === undefined ||
           tips.lastUpdate + TIP_EXPIRATION < Date.now()
          ) {
    return true;
  } else {
    return !tips.isValid;
  }
}

function fetchSingleTip(tipId) {
  return dispatch => {
    dispatch(requestTips);
    return api.get("tips/" + tipId)
      .then(results => dispatch(addTip(results.data)))
      .catch(error => console.log(error));
  };
}

function shouldFetchSingleTip(state, tipId) {
  const tips = state.tips;
  if (tips.items === undefined || tips.items.length === 0) {
    return true;
  } else if (tips.items.find( tip => tip.id === tipId)) {
    return false;
  } else {
    return true;
  }
}

function fetchCurrentUser(state) {
  return dispatch => {
    let axiosConfig = {
      headers: {
        "Authorization": "Token " + state.user.token
      }
    };
    return api.get("auth/users/me/", axiosConfig)
      .then(results => dispatch(userUpdate(results.data.username)))
      .catch(error => dispatch(logout()));
  };
}

function shouldFetchCurrentUser(state) {
  if (!state.user.didFetch ||
      state.user.lastUpdate === null ||
      state.user.lastUpdate === undefined ||
      state.user.lastUpdate + USER_EXPIRATION < Date.now()
     ) {
    return true;
  } else {
    return false;
  }
}

function setLocationAndInvalidateTip(position) {
  return dispatch => {
    dispatch(setLocation(position));
    dispatch(invalidateAndUpdateTips());
    dispatch(invalidateAndUpdateCities());
  };
}

function invalidateAndUpdateTips() {
  return (dispatch, getState) => {
    dispatch(invalidateTips());
    dispatch(fetchTips(getState()));
  };
}

function fetchLocation() {
  return dispatch => {
    dispatch(loadTips);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
	position => dispatch(setLocationAndInvalidateTip(position)),
	error => dispatch(locationError(error)));
    } else {
      dispatch(locationError("The browser doesn't support geolocation."));
    }
  };
}

function shouldFetchLocation(state) {
  const location = state.location;
  if (location.didLoad) {
    return false;
  } else if (location.isFetching) {
    return false;
  } else {
    return !location.didLoad;
  }
}

export function fetchTipsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTips(getState())) {
      return dispatch(fetchTips(getState()));
    }
  }
}

export function fetchSingleTipIfNeeded(tipId) {
  return (dispatch, getState) => {
    if (shouldFetchSingleTip(getState(), tipId)) {
      return dispatch(fetchSingleTip(tipId));
    }
  }
}

export function fetchCurrentUserIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCurrentUser(getState())) {
      return dispatch(fetchCurrentUser(getState()));
    }
  }
}

export function fetchLocationIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchLocation(getState())) {
      return dispatch(fetchLocation());
    }
  }
}
