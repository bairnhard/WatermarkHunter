import axios from 'axios';

// Use relative URL or environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze', { content: text });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const cleanText = async (text) => {
  try {
    const response = await api.post('/clean', { content: text });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
}; 