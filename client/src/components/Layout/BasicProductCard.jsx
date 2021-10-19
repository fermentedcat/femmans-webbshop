import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BasicCard = ({ product }) => {
  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardMedia
        component='img'
        alt={product.title}
        height='140'
        image={product.photos[0]}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {product.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasicCard;
