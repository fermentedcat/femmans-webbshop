import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { UiContext } from '../../context/uiContext';

import { loginUser } from '../../api/api';
import useInput from '../../hooks/useInput';
import user from '../../constants/formFields';

import { FormGenerator } from './FormGenerator';
import { StyledButton } from '../Buttons/StyledButton';

export const LoginForm = ({ exitForm }) => {
  const { login } = useContext(AuthContext);
  const { setNotification } = useContext(UiContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInput = useInput(user.email.validate);
  const passwordInput = useInput(user.password.validate);

  const inputs = [
    { ...emailInput, ...user.email },
    { ...passwordInput, ...user.password },
  ];

  const handleSubmit = async () => {
    if (!formIsValid) {
      setNotification({
        type: 'error',
        message: 'Alla fält måste vara korrekt ifyllda',
      });
    } else {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      try {
        const response = await loginUser(data);
        login(response.data);
        setNotification({
          type: 'success',
          message: 'Inloggingen var en succé!',
        });
        exitForm();
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Inloggingen misslyckades.',
        });
      }
    }
  };

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid);
  }, [emailInput.isValid, passwordInput.isValid]);

  const button = (
    <StyledButton onClick={handleSubmit} disabled={!formIsValid}>
      Logga in
    </StyledButton>
  );

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  );
};
