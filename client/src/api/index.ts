import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://local.test.com/api',
  withCredentials: true,
});