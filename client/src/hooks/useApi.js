import { useReducer, useEffect, useCallback } from 'react';
import { API_BASE_URL } from "../constants/constants";
import axios from 'axios';
import { getToken } from "../token";

const initialState = {
  data: null,
  error: null,
};

const stateReducer = (state, action) => {
  if (action.type === 'DATA') {
    return { data: action.data, error: null };
  }
  if (action.type === 'ERROR') {
    return { data: null, error: action.error };
  }

  return stateReducer;
};

const useApi = (initialEndpoint) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);


  const callGet = useCallback( async (endpoint = initialEndpoint) => {
    try {
      const response = await axios({ 
        url: `${API_BASE_URL}${endpoint}`, 
        headers: { 
          'x-auth-token': getToken() 
        } 
      });
      dispatch({ type: 'DATA', data: response.data})
      return true;
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to get data.' }); //? ändra error
      return false;
    }
  }, [initialEndpoint]);

  const callPost = async (data, endpoint) => {
    try {
      const response = await axios({ 
        url: `${API_BASE_URL}${endpoint}`, 
        method: 'POST', 
        headers: { 
          'x-auth-token': getToken() 
        }, 
        data: data 
      });
      console.log("prev", state.data)
      dispatch({ type: 'DATA', data: response.data})
      const newdata = state.data
      console.log("post", newdata)
      console.log('waiting')
      return true;
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to send data.' }); //? ändra error
      return false;
    }
  };

  const callDelete = (endpoint) => {
    try {
      const response = axios({ 
        url: `${API_BASE_URL}${endpoint}`, 
        method: 'DELETE', 
        headers: { 
          'x-auth-token': getToken() 
        } });
      dispatch({ type: 'DATA', data: response.data})
      return true;
    } catch (error) {
      dispatch({ type: 'ERROR', error: 'Failed to delete.' }); //? ändra error
      return false;
    }
  };

  const setData = (data) => {
    dispatch({ type: 'SET', data: data });
  }

  useEffect(() => {
    if (initialEndpoint) callGet(initialEndpoint)
  }, [initialEndpoint, callGet])

  return {
    data: state.data,
    error: state.error,
    callGet,
    callPost,
    callDelete,
    setData
  };
};

export default useApi;
