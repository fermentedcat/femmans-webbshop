import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const AuthUserRoute = ({ component: Component, path }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={() => (isAuthenticated ? <Component /> : <Redirect to="/" />)}
    />
  );
};
