import React, { useEffect, useState } from 'react'
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
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('login')

    const toggleShowModal = () => {
        setShowModal(!showModal)
    }

    const openModal = (e) => {
        if (!showModal) setShowModal(true)
        setModalType(e.target.name)
    }

    const modalForm = modalType === 'login' ? <LoginForm /> : <RegisterForm />

    const loginButton = <StyledButton name="login" onClick={openModal.bind(this)}>{showModal ? 'Jag har redan ett konto' : 'Logga in'}</StyledButton>;
    const registerButton = <StyledButton name="register" onClick={openModal.bind(this)}>{showModal ? 'Jag har inget konto' : 'Registrera konto'}</StyledButton>;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Webbshopp
                    </Typography>
                    <StyledButton component={Link} to="/">Home</StyledButton>
                    <StyledButton component={Link} to="/admin">Admin</StyledButton>
                    {loginButton}
                    {registerButton}
                </Toolbar>
            </AppBar>
            <BasicModal
                minHeight="70vh"
                open={showModal}
                onClose={toggleShowModal}
                title={modalType === 'login' ? 'Logga in' : 'Registrera konto'}
                content={modalForm}
                buttons={modalType === 'login' ? registerButton : loginButton}
            />
        </Box>
    );
}