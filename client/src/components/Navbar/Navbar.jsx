import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { UiContext } from '../../context/uiContext';

import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { SearchField } from '../Form/SearchField';
import { CartIcon } from '../UI/CartIcon';
import { NavButton } from '../Buttons/NavButton';
import { CategoryButton } from '../Buttons/CategoryButton';

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { openModal, setNotification, cartFetch } = useContext(UiContext);
  const history = useHistory()

  const handleLogout = () => {
    logout();
    setNotification({
      type: 'success',
      message: 'Du är utloggad. Välkommen åter!',
    });
    history.push('/')
  };

  useEffect(() => {
    if (isAuthenticated) {
      cartFetch()
    }
  }, [isAuthenticated, cartFetch])

  return (
    <Toolbar
      sx={{
        backgroundColor: '#494345',
        alignItems: 'stretch',
        minHeight: '48px !important',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <NavButton component={Link} to='/'>
          Hem
        </NavButton>
        <CategoryButton />
        <SearchField />
      </Box>
      <Box>
        {!isAuthenticated && (
          <NavButton name='login' onClick={openModal}>
            Logga in
          </NavButton>
        )}
        {!isAuthenticated && (
          <NavButton name='register' onClick={openModal}>
            Registrera konto
          </NavButton>
        )}
        {isAuthenticated && (
          <NavButton onClick={handleLogout}>Logga ut</NavButton>
        )}
        {isAuthenticated && (
          <NavButton component={NavLink} to="/user-profile">Min sida</NavButton>
        )}
        {isAuthenticated && <CartIcon />}
      </Box>
    </Toolbar>
  );
};
