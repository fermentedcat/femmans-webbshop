import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProduct } from '../api/api';
import { Typography, Box, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const ProductDetailPage = (props) => {
  const prodId = props.match.params.id;
  const { data: product } = useFetch(getProduct, prodId);
  console.log(product);
  return (
    <Box>
      {product && (
        <>
          <Typography variant='h3'>{product.title}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <img src={product.photos[0]} alt='product.title' />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button
                sx={{ width: '90%', margin: '0 5%' }}
                id='button'
                variant='contained'
              >
                <AddShoppingCartIcon sx={{ mr: '3px' }} />
                <Typography>{product.price} kr</Typography>
              </Button>
            </Box>
          </Box>
          <Typography variant='body1'>{product.description}</Typography>
        </>
      )}
    </Box>
  );
};
