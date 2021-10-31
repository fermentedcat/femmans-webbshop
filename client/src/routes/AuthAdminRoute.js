import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const AuthAdminRoute = ({ component: Component, path }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={() => (isAuthenticated && role === 'admin' ? <Component /> : <Redirect to="/" />)}
    />
  );
};
