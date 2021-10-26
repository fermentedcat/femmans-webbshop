import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFetch } from '../hooks/useFetch';
import { getProducts } from '../api/api.js';
import { BasicProductGrid } from '../components/Layout/BasicProductGrid';

export const ProductsPage = () => {
  const { data } = useFetch(getProducts);

  return (
    <Box>
      <Typography variant='h3'>Alla Produkter</Typography>
      {data && <BasicProductGrid products={data} />}
    </Box>
  );
};
