import { combineReducers } from 'redux';
import location from './location';
import user from './user';
import tips from './tips';
import cities from './cities';

export default combineReducers({
  location,
  user,
  tips,
  cities
});
