import axios from 'axios';

// export const baseURL = 'http://localhost:8990/';
// for production
export const baseURL = '/';
// new Axios instance for use interceptors and set baseURL
const axiosInstance = axios.create({
    baseURL: baseURL,
});
export default axiosInstance;
