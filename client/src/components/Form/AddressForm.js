import React, { useEffect, useState } from 'react';

import useInput from '../../hooks/useInput';
import { Box, TextField, Button } from '@mui/material';
import { address } from '../../constants/formFields';

export const AddressForm = ({ order, onSubmitHandler }) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const streetValue = order ? order.address.street : '';
  const postalCodeValue = order ? order.address.postalCode : '';
  const cityValue = order ? order.address.city : '';
  const countryValue = order ? order.address.country : '';

  const streetInput = useInput(address.street.validate, streetValue);
  const postalCodeInput = useInput(
    address.postalCode.validate,
    postalCodeValue
  );
  const cityInput = useInput(address.city.validate, cityValue);
  const countryInput = useInput(address.country.validate, countryValue);

  const inputs = [
    { ...streetInput, ...address.street },
    { ...postalCodeInput, ...address.postalCode },
    { ...cityInput, ...address.city },
    { ...countryInput, ...address.country },
  ];

  const inputFields = inputs.map((input, index) => {
    return (
      <TextField
        key={index}
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={input.label}
        required={input.required}
      />
    );
  });

  const handleSubmit = () => {
    if (!formIsValid) {
      return;
    } else {
      const data = {
        street: streetInput.value,
        postalCode: postalCodeInput.value,
        city: cityInput.value,
        country: countryInput.value,
      };
      onSubmitHandler(data);
    }
  };

  useEffect(() => {
    setFormIsValid(
      streetInput.isValid &&
        postalCodeInput.isValid &&
        cityInput.isValid &&
        countryInput.isValid
    );
  }, [
    streetInput.isValid,
    postalCodeInput.isValid,
    cityInput.isValid,
    countryInput.isValid,
  ]);

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        {inputFields}
      </Box>
      <Button onClick={handleSubmit} disabled={!formIsValid}>
        Spara
      </Button>
    </>
  );
};
