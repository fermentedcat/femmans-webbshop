import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const AuthAdminRoute = ({ component: Component, ...restOfProps }) => {
  const { isAuthenticated, role } = useContext(AuthContext)
  
  return (
    <Route {...restOfProps} render={() => {
      return isAuthenticated && role === 'admin' ? <Component /> : <Redirect to="/" />
    }}/>
  )
}