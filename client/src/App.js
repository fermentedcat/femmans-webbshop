import React, { useContext, useEffect } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { UiContext } from './context/uiContext';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AdminPage } from './pages/AdminPage';
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';
import { Header } from './components/Layout/Header';

function App() {
  const { isAuthenticated, email } = useContext(AuthContext);
  const { notification } = useContext(UiContext);

  return (
    <Container disableGutters sx={{ width: '75vw', height: '100vh', backgroundColor: '#F6F4F4', mx: 'auto' }}>
      <Header />
      <Box sx={{ padding: 2 }}>
        { notification.show && <p>{notification.type}: {notification.message}</p>}
        { isAuthenticated ? <p>Welcome, {email}</p> : <p>Not logged in</p>}
        <Switch>
          <Route path="/all-products" component={ProductsPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Box>
    </Container>
  );
}

export default App;
