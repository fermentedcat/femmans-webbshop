import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext'

import { loginUser } from '../../api/api'
import useInput from '../../hooks/useInput';
import { Button } from '@mui/material';
import user from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';

export const LoginForm = ({exitForm}) => {
  const { login } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInput = useInput(user.email.validate);
  const passwordInput = useInput(user.password.validate);

  const inputs = [
    { ...emailInput, ...user.email },
    { ...passwordInput, ...user.password },
  ];

  const handleSubmit = async () => {
    if (!formIsValid) {
      return;
    } else {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      try {
        const response = await loginUser(data)
        login(response.data)
        exitForm()  
      } catch (error) {
        console.log('Login failed.')
      }
    }
  };

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid);
  }, [emailInput.isValid, passwordInput.isValid]);

  const button = (
    <Button onClick={handleSubmit} disabled={!formIsValid}>
      Logga in
    </Button>
  );

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  );
};
