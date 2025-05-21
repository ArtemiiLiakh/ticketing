import config from '@/config';
import axios from 'axios';

export const api = axios.create({
  baseURL: config.NEXT_PUBLIC_HOST,
  withCredentials: true,
});