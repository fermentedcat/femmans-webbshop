import { API_BASE_URL } from "../constants/constants";
import axios from 'axios';

export const getUsers = (token) => axios({ url: `${API_BASE_URL}users`, headers: { 'x-auth-token': token } })
export const getUser = (token, id) => axios({ url: `${API_BASE_URL}users/${id}`, headers: { 'x-auth-token': token } })
export const addUser = (user) => axios({ url: `${API_BASE_URL}users`, method: 'POST', data: user })
export const updateUser = (token, user, id) => axios({ url: `${API_BASE_URL}users/${id}`, method: 'POST', headers: { 'x-auth-token': token }, data: user })
export const deleteUser = (token, id) => axios({ url: `${API_BASE_URL}users/${id}`, method: 'DELETE', headers: { 'x-auth-token': token } })


//
export const getProducts = () => axios({ url: `${API_BASE_URL}products` });
export const getProduct = (id) => axios({ url: `${API_BASE_URL}products/${id}` });
export const getProductsByCategory = (id) => axios({ url: `${API_BASE_URL}products/category/${id}` });
export const addProduct = (token) => axios({ url: `${API_BASE_URL}products`, method: 'POST', headers: { 'x-auth-token': token } });
export const updateProduct = (token, product, id) => axios({ url: `${API_BASE_URL}products/${id}`, method: 'POST', headers: { 'x-auth-token': token }, data: product });
export const deleteProduct = (token, id) => axios({ url: `${API_BASE_URL}products/${id}`, method: 'DELETE', headers: { 'x-auth-token': token } });


//
export const getCategories = () => axios({ url: `${API_BASE_URL}categories` });
export const getCategory = (id) => axios({ url: `${API_BASE_URL}categories/${id}` }); // may not be needed
export const addCategory = (token, category) => axios({ url: `${API_BASE_URL}categories/`, method: 'POST', headers: { 'x-auth-token': token }, data: category });
export const updateCategory = (token, category, id) => axios({ url: `${API_BASE_URL}categories/${id}`, method: 'POST', headers: { 'x-auth-token': token }, data: category });
export const deleteCategory = (token, id) => axios({ url: `${API_BASE_URL}categories/${id}`, method: 'DELETE', headers: { 'x-auth-token': token } });


//
export const getOrders = (token) => axios({ url: `${API_BASE_URL}orders`, headers: { 'x-auth-token': token } });
export const getOrder = (token, id) => axios({ url: `${API_BASE_URL}orders/${id}`, headers: { 'x-auth-token': token } });
export const addOrder = (token, order) => axios({ url: `${API_BASE_URL}orders`, method: 'POST', headers: { 'x-auth-token': token }, data: order });
export const uppdateOrder = (token, order, id) => axios({ url: `${API_BASE_URL}orders/${id}`, method: 'POST', headers: { 'x-auth-token': token }, data: order });
export const deleteOder = (token, id) => axios({ url: `${API_BASE_URL}orders/${id}`, method: 'DELETE', headers: { 'x-auth-token': token } });