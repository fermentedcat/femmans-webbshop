import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { BasicModal } from '../Layout/BasicModal';
import { RegisterForm } from '../Form/RegisterForm';
import { LoginForm } from '../Form/LoginForm';

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'white',
  margin: '.3em',
  '&:hover': {
    backgroundColor: '#ededed'
  }
}));

export const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('login');

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const openModal = (e) => {
        if (!showModal) setShowModal(true);
        setModalType(e.target.name);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Webbshopp
                    </Typography>
                    <StyledButton component={Link} to="/">Home</StyledButton>
                    <StyledButton component={Link} to="/admin">Admin</StyledButton>
                    <StyledButton name="login" onClick={openModal.bind(this)}>Logga in</StyledButton>
                    <StyledButton name="register" onClick={openModal.bind(this)}>Registrera konto</StyledButton>
                </Toolbar>
            </AppBar>
            <BasicModal
                minHeight="70vh"
                open={showModal}
                onClose={toggleShowModal}
                title={modalType === 'login' ? 'Logga in' : 'Registrera konto'}
            >
                {modalType === 'login' ? 
                    <>
                        <LoginForm exitForm={toggleShowModal}/>
                        <StyledButton name="register" onClick={openModal.bind(this)}>Jag har inget konto</StyledButton>
                    </> : 
                    <>
                        <RegisterForm exitForm={toggleShowModal}/>
                        <StyledButton name="login" onClick={openModal.bind(this)}>Jag har redan ett konto</StyledButton>
                    </>
                }
            </BasicModal>
        </Box>
    );
}