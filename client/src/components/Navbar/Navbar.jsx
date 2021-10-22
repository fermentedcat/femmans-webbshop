import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UiContext } from '../../context/uiContext';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { SearchField } from '../Form/SearchField';

const NavButton = styled(Button)(() => ({
    backgroundColor: 'none',
    margin: 0,
    height: '100%',
    borderRadius: 0,
    color: '#F9F9F9',
    '&:hover': {
        backgroundColor: '#686364'
    },
    '&:active': {
        backgroundColor: '#C6BEBE'
    }
}));

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
                {isAuthenticated && <NavButton onClick={handleLogout}>Logga ut</NavButton>}
                {!isAuthenticated && <NavButton name="register" onClick={openModal}>Registrera konto</NavButton>}
            </Box>
        </Toolbar>
    );
}