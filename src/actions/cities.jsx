import api from '../api';

function requestCities() {
  return {
    type: 'REQUEST_CITIES'
  };
}

function invalidateCities() {
  return {
    type: 'INVALIDATE_CITIES'
  };
}

function loadCities (cities) {
  return {
    type: 'LOAD_CITIES',
    cities
  };
}

function fetchCities(state) {
  return dispatch => {
    dispatch(requestCities);
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
    return api.get("cities", args)
      .then(results => dispatch(loadCities(results.data.results)))
      .catch(error => console.log(error));
  };
}

function shouldFetchCities(state) {
  const cities = state.cities;
  if (cities.isFetching) {
    console.log("Already fetching");
    return false;
  }
  else if (cities.items === undefined || cities.items.length === 0) {
    console.log("No city loaded, fetching.");
    return true;
  } else {
    console.log("Are cities valid? " + cities.isValid);
    return !cities.isValid;
  }
}

export function invalidateAndUpdateCities() {
  return (dispatch, getState) => {
    dispatch(invalidateCities());
    dispatch(fetchCities(getState()));
  };
}

export function fetchCitiesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCities(getState())) {
      return dispatch(fetchCities(getState()));
    }
  }
}
