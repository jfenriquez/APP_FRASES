import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const baseURL = API_URL;
// Instancia de Axios con autenticación
const apiAuth = axios.create({
  baseURL,
});

// Instancia de Axios sin autenticación
const apiNoAuth = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/////midleware axios-- interceptor Token
apiAuth.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export {apiAuth, apiNoAuth};
