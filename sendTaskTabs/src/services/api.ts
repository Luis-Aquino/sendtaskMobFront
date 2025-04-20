// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.3:8080', // Ex: http://192.168.0.105:8080
});

export default api;
