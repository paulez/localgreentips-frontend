import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.api;

export default axios.create({
  baseURL: config.api,
});
