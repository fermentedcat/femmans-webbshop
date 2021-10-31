import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useBuy } from '../../hooks/useBuy';

export const BasicProductCard = ({ product }) => {
  const [buy] = useBuy();
  const history = useHistory();

  const buyProduct = (e) => {
    e.stopPropagation();
    buy(product);
  };

  const redirectToDetails = () => {
    history.push(`/product/${product._id}`);
  };

  return (
    <>
      <Card
        sx={{ width: 250, height: 375, cursor: 'pointer' }}
        onClick={redirectToDetails}
      >
        <CardMedia
          component="img"
          alt={product.title}
          height="250"
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
            variant="h5"
            component="div"
          >
            {product.title}
          </Typography>
        </CardContent>
        <Button
          sx={{ width: '90%', margin: '0 5%' }}
          id="button"
          variant="contained"
          onClick={buyProduct}
        >
          <AddShoppingCartIcon sx={{ mr: '3px' }} />
          <Typography>
            {product.price}
            {' '}
            kr
          </Typography>
        </Button>
      </Card>
    </>
  );
};

export default BasicProductCard;
