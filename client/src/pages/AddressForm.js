import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const AddressForm = (data) => {

    const [user, setUser] = useState(data.data)
    // const user = data.data;
    console.log(user)

    const handleOnChange = (e) => {
        console.log(user)
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
                        id="user.fullName"
                        name="fullName"
                        value={user.fullName}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        value={user.address.street}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="postalCode"
                        name="postalCode"
                        value={user.address.postalCode}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        value={user.address.city}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        value={user.address.country}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        value={user.email}
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </Grid>
            </Grid>
        </>
    );
}
export default AddressForm;