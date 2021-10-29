

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ListItemIcon, Box } from '@mui/material';


export default function Review({ cart, user, payment }) {

    const products = cart.cart;
    const payments = [
        { name: 'Card holder', detail: `${payment.cardName}` || 'Mr Luri Fax' },
        { name: 'Card number', detail: `${payment.cardNumber}` || 'xxxx-xxxx-xxxx-1234' },
        { name: 'Expiry date', detail: `${payment.expDate}` || '04/2024' },
    ];

    const getAddress = () => {
        return [`${user.address.street}, ${user.address.postalCode}, ${user.address.city}, ${user.address.country}`];
    }

    const getTotal = () => {
        return products
            .map((item) => item.product.price * item.amount)
            .reduce((sum, i) => sum + i, 0);
    }


    return (
        <>
            <Typography variant="h6" gutterBottom>
                Beställning
            </Typography>
            <List disablePadding>
                <Box sx={{ height: '25ch', overflow: 'auto' }}>
                    {products.map((product) => (
                        <ListItem key={product.product.title} sx={{ py: 1, px: 0 }}>
                            <img src={product.product.photos[0]} style={{ 'width': '10ch', 'margin-right': 2 }} alt='product' />
                            <ListItemText primary={product.product.title} />
                            <Typography variant="body2">{product.product.price}kr</Typography>
                        </ListItem>
                    ))}
                </Box>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {getTotal()}kr
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Leveransadress
                    </Typography>
                    <Typography gutterBottom>{user.fullName}</Typography>
                    <Typography gutterBottom>{getAddress()}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Betalning
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}