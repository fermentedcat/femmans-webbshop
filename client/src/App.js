import React, { useContext, useEffect } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/authContext'
import { UiContext } from './context/uiContext'

import Container from '@mui/material/Container'
import { AdminPage } from './pages/AdminPage';
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';
import { Navbar } from './components/Navbar/Navbar.jsx';

function App() {
  const { isAuthenticated, email } = useContext(AuthContext);
  const { notification } = useContext(UiContext);

  return (
    <Container>
      <Navbar />
      { notification.show && <p>{notification.type}: {notification.message}</p>}
      { isAuthenticated ? <p>Welcome, {email}</p> : <p>Not logged in</p>}
      <Switch>
        <Route path="/all-products" component={ProductsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Container>
  );
}

export default App;
