import axios from 'axios';

const API = axios.create({
  baseURL: 'https://carimakan-backend-production.up.railway.app/api',
});

export const searchMeals = (query) => API.get(`/meals/search?q=${query}`);
export const getMealDetail = (id) => API.get(`/meals/${id}`);
export const getCategories = () => API.get('/meals/categories');
export const getCart = () => API.get('/cart');
export const addToCart = (item) => API.post('/cart', item);
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const clearCart = () => API.delete('/cart/clear');