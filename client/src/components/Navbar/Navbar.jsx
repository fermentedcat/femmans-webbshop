import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UiContext } from '../../context/uiContext';

import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { SearchField } from '../Form/SearchField';
import { CartIcon } from '../UI/CartIcon';
import { NavButton } from '../Buttons/NavButton';



export const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { openModal } = useContext(UiContext);

    const handleLogout = () => {
        logout()
    }

    return (
        <Toolbar sx={{ backgroundColor: "#494345", alignItems: 'stretch', minHeight: '48px !important'}}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <NavButton component={Link} to="/">Hem</NavButton>
                <NavButton>Spel</NavButton>
                <SearchField />
            </Box>
            <Box>
                {!isAuthenticated && <NavButton name="login" onClick={openModal}>Logga in</NavButton>}
                {!isAuthenticated && <NavButton name="register" onClick={openModal}>Registrera konto</NavButton>}
                {isAuthenticated && <NavButton onClick={handleLogout}>Logga ut</NavButton>}
                {isAuthenticated && <CartIcon />}
            </Box>
        </Toolbar>
    );
}