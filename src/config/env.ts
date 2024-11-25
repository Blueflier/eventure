export const ENV = {
  dev: {
    apiUrl: 'http://localhost:8080',
  },
  prod: {
    apiUrl: 'https://api.yourapp.com',
  },
};

export const getApiUrl = () => {
  // You can add logic here to determine which environment you're in
  return __DEV__ ? ENV.dev.apiUrl : ENV.prod.apiUrl;
}; 