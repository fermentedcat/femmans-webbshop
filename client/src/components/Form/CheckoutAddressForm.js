import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

export const AddressForm = ({ user, setUser }) => {

    const handleOnChange = (e) => {
        const target = e.target.name;
        const value = e.target.value;
        const id = e.target.id;

        if (id) {
            setUser({
                ...user,
                [id]: { [target]: value }
            })
        } else {
            setUser({
                ...user,
                [target]: value
            })
        }
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Leveransadress
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Namn"
                        id=""
                        name="fullName"
                        value={user.fullName}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Adress"
                        id="address"
                        name="street"
                        value={user.address.street}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        label="Postkod"
                        id="address"
                        name="postalCode"
                        value={user.address.postalCode}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="Stad"
                        id="address"
                        name="city"
                        value={user.address.city}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="Land"
                        id="address"
                        name="country"
                        value={user.address.country}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled
                        label="Epost"
                        id="email"
                        name="email"
                        value={user.email}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                        InputLabelProps={{ shrink: true }}

                    />
                </Grid>
            </Grid>
        </>
    );
}
export default AddressForm;