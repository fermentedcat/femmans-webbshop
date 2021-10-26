import React, { createContext, useReducer } from 'react';
import { setToken, removeToken, getToken } from '../token';
import jwtDecode from 'jwt-decode'
import { authUser } from '../api/api'

const initialState = {
  isAuthenticated: false,
  role: '',
  email: '',
};

const AuthContext = createContext(initialState);
export { AuthContext };


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { 
        isAuthenticated: true, 
        role: action.data.role, 
        email: action.data.email 
      };
    }
    case 'LOGOUT': {
      return initialState;
    }

    default: return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token) => {
    setToken(token);
    const data = jwtDecode(token);
    dispatch({ type: 'LOGIN', data });
  }

  const authenticate = async () => {
    const token = getToken()
    if (token) {
      try {
        await authUser()
        const data = jwtDecode(token);
        dispatch({ type: 'LOGIN', data });
      } catch (error) {
        return;
      }
    }
  }

  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  }

  const auth = { 
    isAuthenticated: state.isAuthenticated,
    role: state.role,
    email: state.email,
    login,
    authenticate,
    logout
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}