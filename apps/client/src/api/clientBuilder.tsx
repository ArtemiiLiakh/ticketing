import config from '@/config';
import axios from 'axios';

const clientBuilder = ({ req }: any) => {
  return axios.create({
    baseURL: config.NEXT_PUBLIC_HOST,
    headers: req?.headers,
    withCredentials: true,
  });
}

export default clientBuilder;