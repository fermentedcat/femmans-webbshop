import React, { useEffect, useState } from 'react';

import useInput from '../../hooks/useInput';
import { addUser } from '../../api/api'

import { Button } from '@mui/material';
import user, { address } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';

export const RegisterForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const fullNameInput = useInput(user.fullName.validate);
  const displayNameInput = useInput(user.displayName.validate);
  const emailInput = useInput(user.email.validate);
  const passwordInput = useInput(user.password.validate);
  const streetInput = useInput(address.street.validate);
  const postalCodeInput = useInput(address.postalCode.validate);
  const cityInput = useInput(address.city.validate);
  const countryInput = useInput(address.country.validate);

  const inputs = [
    { ...fullNameInput, ...user.fullName },
    { ...displayNameInput, ...user.displayName },
    { ...emailInput, ...user.email },
    { ...passwordInput, ...user.password },
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
        fullName: fullNameInput.value,
        displayName: displayNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        address: {
          street: streetInput.value,
          postalCode: postalCodeInput.value,
          city: cityInput.value,
          country: countryInput.value,
        }
      }
      addUser(data);
    }
  };
  
  useEffect(() => {
    setFormIsValid(
      fullNameInput.isValid &&
      displayNameInput.isValid &&
      emailInput.isValid &&
      passwordInput.isValid
      );
  }, [
    fullNameInput.isValid,
    displayNameInput.isValid,
    emailInput.isValid,
    passwordInput.isValid,
  ]);

  const button = <Button onClick={handleSubmit} disabled={!formIsValid}>Registrera</Button>;

  return <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />;
};
