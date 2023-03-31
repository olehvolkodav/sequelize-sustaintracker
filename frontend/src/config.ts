const apiURL: Record<typeof process.env.NODE_ENV, string> = {
  development: 'http://localhost:8080/api',
  test: 'http://localhost:8080/api',
  production: 'http://54.216.229.79/api',
};

export const api = {
  baseURL: apiURL[process.env.NODE_ENV],
};
