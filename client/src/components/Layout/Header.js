import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UiContext } from '../../context/uiContext';

import { Navbar } from '../Navbar/Navbar.jsx';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { BasicModal } from '../Layout/BasicModal';
import { RegisterForm } from '../Form/RegisterForm';
import Button from '@mui/material/Button';
import { LoginForm } from '../Form/LoginForm';
import { styled } from '@mui/material/styles';
import { Card, CardMedia } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  color: '#F9F9F9',
  backgroundColor: '#C6BEBE',
  margin: '.5em',
  '&:hover': {
      backgroundColor: '#686364'
  }
}));

export const Header = () => {
  const { role } = useContext(AuthContext);
  const { modal, toggleModal, openModal } = useContext(UiContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#EBE8E8', boxShadow: 'none' }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateRows: '1em 1fr 1em',
        }}>
          <Card
            sx={{
              width: 280,
              boxShadow: 'none',
              margin: 3,
              backgroundColor: 'transparent',
              mx: "auto",
              gridColumn: '3 / 5',
              gridRow: '2 / auto',
            }}
            >
            <CardMedia
              component="img"
              height="100%"
              image="/femmans-logo.png"
              alt="Femmans Webshop Logo" 
              />
          </Card>
          {role === 'admin' && 
            <StyledButton 
              component={Link} 
              to="/admin" 
              sx={{ 
                justifySelf: 'end',
                alignSelf: 'start',
                gridColumn: 6 
              }}
            >
                Admin
            </StyledButton>
          }
        </Box>
        <Navbar />
      </AppBar>
      <BasicModal
          minHeight="70vh"
          open={modal.show}
          onClose={toggleModal}
          title={modal.type === 'login' ? 'Logga in' : 'Registrera konto'}
      >
          {modal.type === 'login' ?
              <>
                  <LoginForm exitForm={toggleModal} />
                  <StyledButton name="register" onClick={openModal}>Jag har inget konto</StyledButton>
              </> :
              <>
                  <RegisterForm exitForm={toggleModal} />
                  <StyledButton name="login" onClick={openModal}>Jag har redan ett konto</StyledButton>
              </>
          }
      </BasicModal>
  </Box>
  )
}
