import axios from 'axios';

export const baseURL = 'https://127.0.0.1:8000';
// for production
// const baseURL = '';

// Je créer une instance d'axios pour pouvoir utiliser les interceptors et généré l'url de base
const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
