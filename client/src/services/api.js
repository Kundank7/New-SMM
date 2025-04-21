import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

// Services API
export const getServices = () => axios.get('/api/services');
export const getService = (id) => axios.get(`/api/services/${id}`);
export const createService = (data) => axios.post('/api/services', data);
export const updateService = (id, data) => axios.patch(`/api/services/${id}`, data);
export const createOrder = (serviceId, data) => axios.post(`/api/services/${serviceId}/order`, data);

// Orders API
export const getUserOrders = () => axios.get('/api/services/orders/me');
export const getAllOrders = () => axios.get('/api/admin/orders');
export const updateOrder = (id, data) => axios.patch(`/api/admin/orders/${id}`, data);

// Users API
export const getUsers = () => axios.get('/api/admin/users');
export const updateUser = (id, data) => axios.patch(`/api/admin/users/${id}`, data);

// Payments API
export const createPaymentIntent = (amount) => axios.post('/api/payments/create-payment-intent', { amount });
export const getPaymentHistory = () => axios.get('/api/payments/history');

// Admin Stats API
export const getAdminStats = () => axios.get('/api/admin/stats');