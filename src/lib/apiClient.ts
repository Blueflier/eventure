import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_TOKEN_KEY = 'api_token';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setApiToken = async (token: string | null) => {
  if (token) {
    await SecureStore.setItemAsync(API_TOKEN_KEY, token);
  } else {
    await SecureStore.deleteItemAsync(API_TOKEN_KEY);
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(API_TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 