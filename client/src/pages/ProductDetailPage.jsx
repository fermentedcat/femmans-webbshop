import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProduct } from '../api/api';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const ProductDetailPage = (props) => {
  const prodId = props.match.params.id;
  const { data: product } = useFetch(getProduct, prodId);
  console.log(product);
  return (
    <Box>
      {product && (
        <>
          <Typography variant='h3'>{product.title}</Typography>
          <img src={product.photos[0]} alt='product.title' />
        </>
      )}
    </Box>
  );
};
