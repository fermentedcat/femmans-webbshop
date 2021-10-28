import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import useInput from '../../hooks/useInput';
import { addUser, updateUser } from '../../api/api';
import { UiContext } from '../../context/uiContext';

import user, { address } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';
import { StyledButton } from '../Buttons/StyledButton';

export const RegisterForm = ({ userData, exitForm }) => {
  const { login } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const { setNotification } = useContext(UiContext);

  let fullNameInitVal = userData ? userData.fullName : '';
  let displayNameInitVal = userData ? userData.displayName : '';
  let emailInitVal = userData ? userData.email : '';
  let streetInitVal = userData ? userData.address.street : '';
  let postalCodeInitVal = userData ? userData.address.postalCode : '';
  let cityInitVal = userData ? userData.address.city : '';
  let countryInitVal = userData ? userData.address.country : '';

  const fullNameInput = useInput(user.fullName.validate, fullNameInitVal);
  const displayNameInput = useInput(user.displayName.validate, displayNameInitVal);
  const emailInput = useInput(user.email.validate, emailInitVal);
  const passwordInput = useInput(user.password.validate);
  const streetInput = useInput(address.street.validate, streetInitVal);
  const postalCodeInput = useInput(address.postalCode.validate, postalCodeInitVal);
  const cityInput = useInput(address.city.validate, cityInitVal);
  const countryInput = useInput(address.country.validate, countryInitVal);

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
      if (userData) {
        try {
          const response = await updateUser(data, userData._id);
          console.log(response)
          setNotification({
            type: 'success',
            message: 'Din profil har uppdaterats.',
          });
          exitForm();
        } catch (error) {
          setNotification({
            type: 'error',
            message: 'Uppdateringen misslyckades.',
          });
        }
        return;
      }
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
      {user ? 'spara' : 'registrera'}
    </StyledButton>
  );

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  );
};
