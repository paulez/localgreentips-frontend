import api from '../api';

export const login = username => ({
  type: 'LOGIN',
  username
});

export const logout = username => ({
  type: 'LOGOUT',
  username
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

function requestLocation() {
  return {
    type: 'REQUEST_LOCATION'
  };
}

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
      console.log("Location loaded");
      args = {
	params: {  
	  latitude: state.location.latitude,
	  longitude: state.location.longitude
	}
      };
    } else {
      console.log("Is location loaded ?" + state.location.didLoad);
      args = {};
    }
    return api.get("tips/", args)
      .then(results => dispatch(loadTips(results.data.results)))
      .catch(error => console.log(error));
  };
}

function shouldFetchTips(state) {
  const tips = state.tips;
  if (tips.items === undefined || tips.items.length === 0) {
    console.log("No tip loaded, fetching.");
    return true;
  } else if (tips.isFetching) {
    console.log("Already fetching");
    return false;
  } else {
    console.log("Are tips valid? " + tips.isValid);
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

function fetchCurrentUser() {
  return dispatch => {
    return api.get("rest-auth/user/")
      .then(results => dispatch(login(results.data.username)))
      .catch(error => dispatch(logout()));
  };
}

function shouldFetchCurrentUser(state) {
  if (state.user.didFetch) {
    return false;
  } else {
    return true;
  }
}

function setLocationAndInvalidateTip(position) {
  return dispatch => {
    dispatch(setLocation(position));
    dispatch(invalidateAndUpdateTips());
  };
}

function invalidateAndUpdateTips() {
  return (dispatch, getState) => {
    dispatch(invalidateTips());
    dispatch(fetchTips(getState()));
  };
}

function fetchLocation() {
  console.log("Fetching location.");
  return dispatch => {
    dispatch(loadTips);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
	position => dispatch(setLocation(position)),
	error => dispatch(locationError(error)));
    } else {
      dispatch(locationError("The browser doesn't support geolocation."));
    }
  };
}

function shouldFetchLocation(state) {
  const location = state.location;
  if (location.didLoad) {
    console.log("Location has been already loaded.");
    return false;
  } else if (location.isFetching) {
    console.log("Location is being fetched.");
    return false;
  } else {
    console.log("Location was loaded? " + location.didLoad);
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
      return dispatch(fetchCurrentUser());
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
