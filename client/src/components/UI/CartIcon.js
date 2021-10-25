import React, { useContext } from 'react';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box, Badge, IconButton } from '@mui/material';
import { UiContext } from '../../context/uiContext';

export const CartIcon = () => {
  const { cartQty, openModal } = useContext(UiContext);

  return (
    <Box sx={{ display: 'inline-block' }}>
      <IconButton
        sx={{
          '& > *': {
            pointerEvents: 'none',
          },
        }}
        aria-label="shopping cart"
        name="cart"
        onClick={openModal}
      >
        <Badge badgeContent={cartQty} color="primary">
          <ShoppingCartRoundedIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};
