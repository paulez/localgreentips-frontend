import axios from 'axios';
import config from './config.js';

axios.defaults.baseURL = config.api;

export default axios.create({
  baseURL: config.api,
});
