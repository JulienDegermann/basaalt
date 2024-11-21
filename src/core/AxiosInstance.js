import axios from 'axios';

export const baseURL = 'https://127.0.0.1:8001';
// for production
// export const baseURL = '';
// new Axios instance for use interceptors and set baseURL
const axiosInstance = axios.create({
    baseURL: baseURL,
});
export default axiosInstance;
