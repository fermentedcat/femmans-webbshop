import { API_BASE_URL } from "../constants/constants";
import axios from 'axios';
import { getToken } from "../token";


export const getUsers = () => axios({ url: `${API_BASE_URL}users`, headers: { 'x-auth-token': getToken() } })
export const getUser = (id) => axios({ url: `${API_BASE_URL}users/${id}`, headers: { 'x-auth-token': getToken() } })
export const getLoggedInUser = () => axios({ url: `${API_BASE_URL}users/tokenUser`, headers: { 'x-auth-token': getToken() } })
export const getCart = () => axios({ url: `${API_BASE_URL}users/cart`, headers: { 'x-auth-token': getToken() } })
export const authUser = () => axios({ url: `${API_BASE_URL}users/auth`, headers: { 'x-auth-token': getToken() } })
export const addUser = (user) => axios({ url: `${API_BASE_URL}users`, method: 'POST', data: user })
export const updateUser = (user, id) => axios({ url: `${API_BASE_URL}users/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: user })
export const deleteUser = (id) => axios({ url: `${API_BASE_URL}users/${id}`, method: 'DELETE', headers: { 'x-auth-token': getToken() } })
export const loginUser = (data) => axios({ url: `${API_BASE_URL}users/login`, method: 'POST', data: data })

export const addToCart = (id) => axios({ url: `${API_BASE_URL}users/cart/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() } })
export const updateCart = (amount, id) => axios({ url: `${API_BASE_URL}users/cart/update/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: amount })
export const emptyCart = () => axios({ url: `${API_BASE_URL}users/cart/empty`, method: 'POST', headers: { 'x-auth-token': getToken() } })
export const deleteFromCart = (id) => axios({ url: `${API_BASE_URL}users/cart/${id}`, method: 'DELETE', headers: { 'x-auth-token': getToken() } })

//
export const getProducts = () => axios({ url: `${API_BASE_URL}products` });
export const getProduct = (id) => axios({ url: `${API_BASE_URL}products/${id}` });
export const getProductsByCategory = (title) => axios({ url: `${API_BASE_URL}products/category/${title}` });
export const getProductsBySearch = (query) => axios({ url: `${API_BASE_URL}products/search?search=${query}` });
export const addProduct = (product) => axios({ url: `${API_BASE_URL}products`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: product });
export const updateProduct = (product, id) => axios({ url: `${API_BASE_URL}products/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: product });
export const deleteProduct = (id) => axios({ url: `${API_BASE_URL}products/${id}`, method: 'DELETE', headers: { 'x-auth-token': getToken() } });


//
export const getCategories = () => axios({ url: `${API_BASE_URL}categories` });
export const getCategory = (id) => axios({ url: `${API_BASE_URL}categories/${id}` }); // may not be needed
export const addCategory = (category) => axios({ url: `${API_BASE_URL}categories/`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: category });
export const updateCategory = (category, id) => axios({ url: `${API_BASE_URL}categories/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: category });
export const deleteCategory = (id) => axios({ url: `${API_BASE_URL}categories/${id}`, method: 'DELETE', headers: { 'x-auth-token': getToken() } });


//
export const getOrders = () => axios({ url: `${API_BASE_URL}orders`, headers: { 'x-auth-token': getToken() } });
export const getOrder = (id) => axios({ url: `${API_BASE_URL}orders/${id}`, headers: { 'x-auth-token': getToken() } });
export const getOrdersByUser = () => axios({ url: `${API_BASE_URL}orders/user`, headers: { 'x-auth-token': getToken() } });
export const addOrder = (order) => axios({ url: `${API_BASE_URL}orders`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: order });
export const updateOrder = (order, id) => axios({ url: `${API_BASE_URL}orders/${id}`, method: 'POST', headers: { 'x-auth-token': getToken() }, data: order });
export const deleteOrder = (id) => axios({ url: `${API_BASE_URL}orders/${id}`, method: 'DELETE', headers: { 'x-auth-token': getToken() } });