import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProducts } from '../api/api.js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BasicProductCard from '../components/Layout/BasicProductCard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ProductsPage = () => {
  const { data, setData, errors } = useFetch(getProducts);

  return (
    <Box>
      <Typography variant='h3'>Alla Produkter</Typography>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {data &&
          data.map((product) => (
            <>
              <Grid item key={product._id}>
                <BasicProductCard product={product} />
              </Grid>
            </>
          ))}
      </Grid>
    </Box>
  );
};
