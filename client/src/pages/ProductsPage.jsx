import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProducts } from '../api/api.js';
import Box from '@mui/material/Box';
import { BasicProductGrid } from '../components/Layout/BasicProductGrid';
import Typography from '@mui/material/Typography';

export const ProductsPage = () => {
  const { data, setData, errors } = useFetch(getProducts);

  return (
    <Box>
      <Typography variant='h3'>Alla Produkter</Typography>
      {data && <BasicProductGrid products={data} />}
    </Box>
  );
};
