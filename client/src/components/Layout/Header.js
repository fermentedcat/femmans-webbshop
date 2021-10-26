import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import { Navbar } from '../Navbar/Navbar.jsx';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Card, CardMedia } from '@mui/material';
import { StyledButton } from '../Buttons/StyledButton';

export const Header = () => {
  const { role } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#EBE8E8', boxShadow: 'none' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '1em 1fr 1em',
          }}
        >
          <Card
            sx={{
              width: 280,
              boxShadow: 'none',
              margin: 3,
              backgroundColor: 'transparent',
              mx: 'auto',
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
          {role === 'admin' && (
            <StyledButton
              component={Link}
              to="/admin"
              sx={{
                justifySelf: 'end',
                alignSelf: 'start',
                gridColumn: 6,
              }}
            >
              Admin
            </StyledButton>
          )}
        </Box>
        <Navbar />
      </AppBar>
    </Box>
  );
};
