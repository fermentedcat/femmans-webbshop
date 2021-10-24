import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import useInput from '../../hooks/useInput';
import { addUser } from '../../api/api';

import user, { address } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';
import { StyledButton } from '../Buttons/StyledButton';

export const RegisterForm = ({ exitForm }) => {
  const { login } = useContext(AuthContext);
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

  const handleSubmit = async () => {
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
        },
      };
      try {
        const response = await addUser(data);
        login(response.data);
        exitForm();
      } catch (error) {
        console.log('Register failed.');
      }
    }
  };

  useEffect(() => {
    setFormIsValid(
      fullNameInput.isValid &&
        displayNameInput.isValid &&
        emailInput.isValid &&
        passwordInput.isValid &&
        streetInput.isValid &&
        postalCodeInput.isValid &&
        cityInput.isValid &&
        countryInput.isValid
    );
  }, [
    fullNameInput.isValid,
    displayNameInput.isValid,
    emailInput.isValid,
    passwordInput.isValid,
    streetInput.isValid,
    postalCodeInput.isValid,
    cityInput.isValid,
    countryInput.isValid,
  ]);

  const button = (
    <StyledButton onClick={handleSubmit} disabled={!formIsValid}>
      Registrera
    </StyledButton>
  );

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  );
};
