import axios from 'axios';
import store from 'duck/store';

const baseURL = 'https://api.openai.com/v1/completions';

const API_KEY = store.getState().chatGPT.API_KEY || '';

export const chatGptService = axios.create({
  baseURL: baseURL,
  headers: defaultHeaders()
});

export function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  };
}

export default chatGptService;
