import React, { useContext } from 'react';
import { UiContext } from '../../context/uiContext';
import { LoginForm } from '../Form/LoginForm';
import { RegisterForm } from '../Form/RegisterForm';
import { ShoppingCart } from '../Table/ShoppingCart';
import { StyledButton } from '../Buttons/StyledButton';

export const ModalContent = () => {
  const { modal, closeModal, openModal } = useContext(UiContext);

  switch (modal.type) {
    case 'login': {
      return (
        <>
          <LoginForm exitForm={closeModal} />
          <StyledButton name="register" onClick={openModal}>
            Jag har inget konto
          </StyledButton>
        </>
      );
    }
    case 'register': {
      return (
        <>
          <RegisterForm exitForm={closeModal} />
          <StyledButton name="login" onClick={openModal}>
            Jag har redan ett konto
          </StyledButton>
        </>
      );
    }
    case 'cart': {
      return <ShoppingCart />;
    }
    default:
      return <p>no content</p>;
  }
};
