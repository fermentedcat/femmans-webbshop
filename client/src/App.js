import React, { useContext, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { UiContext } from './context/uiContext';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AdminPage } from './pages/AdminPage';
import { LandingPage } from './pages/LandingPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsByCategoryPage } from './pages/ProductsByCategoryPage';
import { Header } from './components/Layout/Header';
import { BasicModal } from './components/Layout/BasicModal';
import { ModalContent } from './components/Layout/ModalContent';

function App() {
  const { isAuthenticated, authenticate, email } = useContext(AuthContext)
  const { modal, closeModal, notification } = useContext(UiContext)

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate()
    }
  }, [isAuthenticated, authenticate])

  return (
    <Container
      disableGutters
      sx={{
        width: '75vw',
        height: '100vh',
        backgroundColor: '#F6F4F4',
        mx: 'auto',
      }}
    >
      <Header />
      <Box sx={{ padding: 2 }}>
        {notification.show && (
          <p>
            {notification.type}: {notification.message}
          </p>
        )}
        {isAuthenticated ? <p>Welcome, {email}</p> : <p>Not logged in</p>}
        <Switch>
          <Route path="/category/:name" component={ProductsByCategoryPage} />
          <Route path="/all-products" component={ProductsPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Box>
      <BasicModal open={modal.show} onClose={closeModal}>
        <ModalContent />
      </BasicModal>
    </Container>
  );
}

export default App;
