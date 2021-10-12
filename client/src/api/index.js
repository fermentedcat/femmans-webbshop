import { API_BASE_URL } from "../constants/constants";
import axios from 'axios';

export const getUsers = (token) => axios({url: `${API_BASE_URL}users`, headers: {'x-auth-token': token}})
//If user sends request, use only JWT, if admin sends req, use both ID and JWT.
export const getUser = (token, id = "") => axios({url: `${API_BASE_URL}users/${id}`, headers: {'x-auth-token': token}})
export const addUser = (user) => axios({url: `${API_BASE_URL}users`, data: user})
export const updateUser = (token, id = "") => axios({url: `${API_BASE_URL}users/${id}`, method: 'POST', headers: {'x-auth-token': token}})
export const deleteUser = (token, id = "") => axios({url: `${API_BASE_URL}users/${id}`,method: 'DELETE', headers: {'x-auth-token': token}})


//
export const getProducts = () => axios.get(`${API_BASE_URL}products`)


//
export const getCategories = () => axios.get(`${API_BASE_URL}users`)


//
export const getOrders = (token) => axios.get(`${API_BASE_URL}users`, {headers: {'x-auth-token': token}})






export const getAll = async (endpoint) => {
  const response = await fetch(`${API_URL_USER}${endpoint}`)
  if (!response.ok) {
    console.log("Error getting user data");
  }
  return await response.json();
}


const API_URL_USER = `http://localhost:3000/api/users/`;

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL_USER}${userId}`)
  if (!response.ok) {
    console.log("Error getting user data");
  }
  return await response.json();
}

export const addNewUser = async (userData) => {
  const response = await fetch(API_URL_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    console.log("Error adding user");
  }
  return await response.json();
}