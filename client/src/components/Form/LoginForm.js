import React, { useEffect, useState } from 'react';

import useInput from '../../hooks/useInput';
import { Button } from '@mui/material';
import user from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';

export const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInput = useInput(user.email.validate);
  const passwordInput = useInput(user.password.validate);

  const inputs = [
    { ...emailInput, ...user.email },
    { ...passwordInput, ...user.password },
  ];

  const handleSubmit = () => {
    if (!formIsValid) {
      return;
    } else {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      console.log(data)
      //TODO: Logga in/ auth
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
