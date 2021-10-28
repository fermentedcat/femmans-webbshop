import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/authContext';
import {  getLoggedInUser } from '../../api/api';

import useInput from '../../hooks/useInput';
import { addUser } from '../../api/api';
import { UiContext } from '../../context/uiContext';

import user, { address } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';
import { StyledButton } from '../Buttons/StyledButton';

export const RegisterForm = ({ edit, exitForm }) => {
  const { login } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const { setNotification } = useContext(UiContext);
  const [userData, setUserData] = useState({
    fullName: '',
    displayName: '',
    email: '',
    password: '',
    street: '',
    postalCode: '',
    city: '',
    country: ''
  });

  const fullNameInput = useInput(user.fullName.validate, userData.fullName);
  const displayNameInput = useInput(user.displayName.validate, userData.displayName);
  const emailInput = useInput(user.email.validate, userData.email);
  const passwordInput = useInput(user.password.validate, userData.password);
  const streetInput = useInput(address.street.validate, userData.street);
  const postalCodeInput = useInput(address.postalCode.validate, userData.postalCode);
  const cityInput = useInput(address.city.validate, userData.city);
  const countryInput = useInput(address.country.validate, userData.country);

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
        setNotification({
          type: 'success',
          message: 'Registreringen lyckades! Du är nu inloggad.',
        });
        exitForm();
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Registreringen misslyckades. Har du redan ett konto på denna mailadress?',
        });
        //TODO: set notification according to db error
      }
    }
  };

  const fetchUser = useCallback( async () => {
    try {
      const res = await getLoggedInUser()
      const data = res.data
      console.log(userData);
      setUserData({ 
        fullName: data.fullName,
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        street: data.address.street,
        postalCode: data.address.postalCode,
        city: data.address.city,
        country: data.address.country
      })
    } catch (error) {
      console.log(error);
    }
    
  }, []);

  useEffect(() => {
    console.log(fullNameInput)
  }, [fullNameInput])

  useEffect(() => {
    if (edit) {
      fetchUser()
    }
  }, [fetchUser, edit]);

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
      {edit ? 'spara' : 'registrera'}
    </StyledButton>
  );

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  );
};
