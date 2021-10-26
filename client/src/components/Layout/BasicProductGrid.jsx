import React from 'react';
import Grid from '@mui/material/Grid';
import BasicProductCard from './BasicProductCard';

export const BasicProductGrid = ({ products }) => {
  return (
    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
      {products.map((product) => (
        <>
          <Grid item key={product._id}>
            <BasicProductCard product={product} />
          </Grid>
        </>
      ))}
    </Grid>
  );
};
