import axios from 'axios';

const clientBuilder = ({ req }: any) => {
  return axios.create({
    baseURL: 'http://local.test.com/api',
    headers: req?.headers,
    withCredentials: true,
  });
}

export default clientBuilder;