import React, { useContext } from 'react'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box, Badge } from '@mui/material';
import { UiContext } from '../../context/uiContext';


export const CartIcon = () => {
  const { cartQty, toggleModal } = useContext(UiContext);

  return (
    <Box sx={{ display: 'inline-block'}}>
      <Badge badgeContent={cartQty} color="primary">
        <ShoppingCartRoundedIcon />
      </Badge>
    </Box>
  )
}
