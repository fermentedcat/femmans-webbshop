import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { useBuy } from '../hooks/useBuy';
import { getProduct } from '../api/api';
import { Typography, Box, Button, List, ListItem } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

export const ProductDetailPage = (props) => {
  const prodId = props.match.params.id;
  const { data: product } = useFetch(getProduct, prodId);
  const [buy] = useBuy();

  const handleBuy = () => {
    buy(product);
  };

  return (
    <>
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
              style={{
                maxWidth: '50%',
                height: '100%',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: '20px',
              }}
            >
              <Button
                variant='contained'
                sx={{ width: '100%', alignSelf: 'center', margin: '20px' }}
                onClick={handleBuy}
              >
                <AddShoppingCartIcon />
                <Typography>{product.price} kr</Typography>
              </Button>
              <Box>
                <Typography variant='h5'>Beskrivning</Typography>
                <Typography variant='body1'>{product.description}</Typography>
                <hr />
                <Typography variant='h6'>Kategorier</Typography>
                <List>
                  {product.categories.map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category.title.toLowerCase()}`}
                    >
                      <ListItem>
                        <Typography>{category.title}</Typography>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
