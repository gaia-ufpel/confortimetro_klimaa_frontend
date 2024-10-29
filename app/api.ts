import axios from 'axios';

const Cookies = require('js-cookie');

const api = axios.create({
  baseURL: 'https://klimaa.glbessa.dev.br:51625',
  timeout: 10000,
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        Cookies.remove('token');
        Cookies.remove('session');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;