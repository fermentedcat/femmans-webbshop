import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const AuthUserRoute = ({ component: Component, ...restOfProps }) => {
  const { isAuthenticated } = useContext(AuthContext)
  
  return (
    <Route {...restOfProps} render={() => {
      return isAuthenticated ? <Component /> : <Redirect to="/" />
    }}/>
  )
}
