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
          <Typography variant='h3'>{product.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <img
                src={product.photos[0]}
                alt='product.title'
                style={{ maxWidth: '500px', minWidth: '200px' }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Button
                sx={{ width: '50%', margin: '0 5%', alignSelf: 'center' }}
                id='button'
                variant='contained'
              >
                <AddShoppingCartIcon sx={{ mr: '3px' }} />
                <Typography>{product.price} kr</Typography>
              </Button>
              <Box sx={{ margin: '0 5%' }}>
                <Typography variant='h6'>Kategorier</Typography>
                <List>
                  {product.categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category.title.toLowerCase()}`}
                    >
                      <ListItem>
                        <Typography key={category._id}>
                          {category.title}
                        </Typography>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Typography variant='h6'>Tillverkare</Typography>
                <Typography variant='body2'>{product.brand}</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant='h4'>Beskrivning</Typography>
            <Typography variant='body2'>{product.description}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
