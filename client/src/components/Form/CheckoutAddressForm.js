import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

export const AddressForm = ({ user, setUser }) => {
  const handleOnChange = (e, isAddress) => {
    const key = e.target.name;
    const { value } = e.target;

    if (isAddress) {
      setUser({
        ...user,
        address: { ...user.address, [key]: value },
      });
    } else {
      setUser({
        ...user,
        [key]: value,
      });
    }
  };

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
            label="Adress"
            name="street"
            value={user.address.street}
            fullWidth
            variant="standard"
            onChange={(e) => handleOnChange(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            label="Postkod"
            name="postalCode"
            value={user.address.postalCode}
            fullWidth
            variant="standard"
            onChange={(e) => handleOnChange(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Stad"
            name="city"
            value={user.address.city}
            fullWidth
            variant="standard"
            onChange={(e) => handleOnChange(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Land"
            name="country"
            value={user.address.country}
            fullWidth
            variant="standard"
            onChange={(e) => handleOnChange(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            label="Epost"
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
};
export default AddressForm;
