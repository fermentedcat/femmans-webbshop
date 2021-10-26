import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BasicProductGrid } from '../components/Layout/BasicProductGrid';
import { getProductsByCategory } from '../api/api';
import { useFetch } from '../hooks/useFetch';

export const ProductsByCategoryPage = (props) => {
  const title = props.match.params.title;
  const { data } = useFetch(getProductsByCategory, title);

  return (
    <Box>
      <Typography variant='h3'>{}</Typography>
      {data && <BasicProductGrid products={data} />}
    </Box>
  );
};
