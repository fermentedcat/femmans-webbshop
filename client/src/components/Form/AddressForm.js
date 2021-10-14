import React, { useEffect, useState } from 'react';

import useInput from '../../hooks/useInput';
import { Button } from '@mui/material';
import { address } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';

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
    <FormGenerator inputs={inputs}>
      <Button onClick={handleSubmit} disabled={!formIsValid}>
        Spara
      </Button>
    </FormGenerator>
  );
};
