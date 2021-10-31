import React from 'react';
import Grid from '@mui/material/Grid';
import BasicProdCard from './BasicProductCard';

export const BasicProductGrid = ({ products }) => (
  <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
    {products.map((product) => (
      <Grid item key={product._id}>
        <BasicProdCard product={product} />
      </Grid>
    ))}
  </Grid>
);
