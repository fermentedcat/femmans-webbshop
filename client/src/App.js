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
import { Alert, Snackbar } from '@mui/material';

function App() {
  const { isAuthenticated, authenticate } = useContext(AuthContext)
  const { modal, closeModal, notification, closeNotification } = useContext(UiContext)

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
        <Switch>
          <Route path="/category/:title" component={ProductsByCategoryPage} />
          <Route path="/all-products" component={ProductsPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Box>
      <Snackbar open={notification.show} autoHideDuration={6000} onClose={closeNotification}>
        <Alert onClose={closeNotification} severity={notification.type || 'info'} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <BasicModal open={modal.show} onClose={closeModal}>
        <ModalContent />
      </BasicModal>
    </Container>
  );
}

export default App;
