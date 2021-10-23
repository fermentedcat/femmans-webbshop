import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { addToCart } from '../../api/api.js';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { UiContext } from '../../context/uiContext.js';

export const BasicProductCard = ({ product }) => {
  const history = useHistory();
  const { cartAdd } = useContext(UiContext)

  const buyProduct = (e) => {
    e.stopPropagation();

    addToCart(product._id)
      .then(res => {
        cartAdd()
      })
      .catch(err => console.log(err))

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
