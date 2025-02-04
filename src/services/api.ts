import axios, { type AxiosInstance } from 'axios';

const API_URL: string = import.meta.env.VITE_DIRECTUS_URL; // Replace with your Directus instance URL

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

