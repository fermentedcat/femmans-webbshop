import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

export default function PaymentForm({ setPayment, payment }) {

    const handleOnChange = (e) => {
        const target = e.target.id;
        const value = e.target.value;

        setPayment({
            ...payment,
            [target]: value
        })
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Betalningsmetod
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="cardName"
                        label="Name on card"
                        value={payment.cardName}
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="cardNumber"
                        label="Card number"
                        value={payment.cardNumber}
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="expDate"
                        label="Expiry date"
                        value={payment.expDate}
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        value={payment.cvv}
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} align="center" mt={3}>
                    <Typography variant="h6" gutterBottom  >
                        Lägg inte in dina riktiga kortuppgifter!
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}