import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UiContext } from '../../context/uiContext.js';
import { AuthContext } from '../../context/authContext.js';
import { addToCart } from '../../api/api.js';

import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const BasicProductCard = ({ product }) => {
  const history = useHistory();
  const { cartAdd, setNotification, openModalType } = useContext(UiContext)
  const { isAuthenticated } = useContext(AuthContext)

  const buyProduct = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setNotification({
        type: 'error',
        message: 'Du måste vara inloggad för att handla.',
      });
      openModalType('login');
      return;
    }

    addToCart(product._id)
      .then(res => {
        cartAdd()
        setNotification({
          type: 'success',
          message: `${product.title} har lagts till i din varukorg.`,
        });
      })
      .catch(err => {
        setNotification({
          type: 'error',
          message: 'Något gick fel. Produkten har inte lagts till i varukorgen.',
        });
      })

    //redirect if user not logged in
    //fetch add to cart 
  };

  const redirectToDetails = (e) => {
    history.push(`/product/${product._id}`);
  };

  return (
    <>
      <Card
        sx={{ width: 250, height: 375, cursor: 'pointer' }}
        onClick={redirectToDetails}
      >
        <CardMedia
          component='img'
          alt={product.title}
          height='250'
          image={product.photos[0]}
        />
        <CardContent>
          <Typography
            sx={{
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            gutterBottom
            variant='h5'
            component='div'
          >
            {product.title}
          </Typography>
        </CardContent>
        <Button
          sx={{ width: '90%', margin: '0 5%' }}
          id='button'
          variant='contained'
          onClick={buyProduct}
        >
          <AddShoppingCartIcon sx={{ mr: '3px' }} />
          <Typography>{product.price} kr</Typography>
        </Button>
      </Card>
    </>
  );
};

export default BasicProductCard;
