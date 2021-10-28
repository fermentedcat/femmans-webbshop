import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProduct } from '../api/api';
import { Typography, Box, Button, List, ListItem } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

export const ProductDetailPage = (props) => {
  const prodId = props.match.params.id;
  const { data: product } = useFetch(getProduct, prodId);
  return (
    <Box>
      {product && (
        <>
          <Typography variant='h3'> {product.title}</Typography>
          <Box>
            <Typography variant='h6' sx={{ display: 'inline' }}>
              Tillverkare:{' '}
            </Typography>
            <Typography variant='body2' sx={{ display: 'inline' }}>
              {product.brand}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <img
              src={product.photos[0]}
              alt=''
              style={{ minHeight: '400px', maxHeight: '500px', width: 'auto' }}
            />
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <Button
                variant='contained'
                sx={{ width: '300px', alignSelf: 'center' }}
              >
                <AddShoppingCartIcon />
                <Typography>{product.price} kr</Typography>
              </Button>
              <Box sx={{ margin: '20px' }}>
                <Typography variant='h5'>Beskrivning</Typography>
                <Typography variant='body1'>{product.description}</Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
