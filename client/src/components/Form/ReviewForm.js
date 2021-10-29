

import React, { Fragment } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

export default function Review({ cart, user, payment }) {

    const products = cart.cart;
    const payments = [
        { name: 'Namn på kort', detail: `${payment.cardName}` || 'Mr Luri Fax' },
        { name: 'Kortnummer', detail: `${payment.cardNumber}` || 'xxxx-xxxx-xxxx-1234' },
        { name: 'Utgångsdatum', detail: `${payment.expDate}` || '04/2024' },
    ];

    const getAddress = () => {
        return [`${user.address.street}, ${user.address.postalCode} ${user.address.city}, ${user.address.country}`];
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
                <ListItem>
                    <ListItemText primary={'Produkt'} />
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Antal</Typography>
                        <Typography variant="body2">Pris</Typography>
                    </Box>
                </ListItem>
                <Box sx={{ height: '25ch', overflow: 'auto' }}>
                    {products.map((product) => (
                        <ListItem key={product.product.title} sx={{ py: 1, px: 0 }}>
                            <img src={product.product.photos[0]} style={{ 'width': '10ch', 'marginRight': 2 }} alt='product' />
                            <ListItemText primary={product.product.title} />
                            <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">{product.amount}st</Typography>
                                <Typography variant="body2">{product.product.price}kr</Typography>
                            </Box>
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
                    <Typography sx={{ width: '30ch' }} gutterBottom>{getAddress()}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Betalning
                    </Typography>
                    <Grid container>
                        {payments.map((payment, i) => (
                            <Fragment key={i}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}