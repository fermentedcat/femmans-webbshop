import { useContext } from 'react';
import { UiContext } from '../context/uiContext'
import { AuthContext } from '../context/authContext.js';
import { addToCart } from '../api/api.js';

export const useBuy = () => {
  const { cartAdd, setNotification, openModalType } = useContext(UiContext)
  const { isAuthenticated } = useContext(AuthContext)
  const handleBuy = (product) => {

    if (!isAuthenticated) {
      setNotification({
        type: 'error',
        message: 'Du måste vara inloggad för att handla.',
      });
      openModalType('login');
      return;
    }

    addToCart(product._id)
      .then(res => {
        cartAdd()
        setNotification({
          type: 'success',
          message: `${product.title} har lagts till i din varukorg.`,
        });
      })
      .catch(err => {
        setNotification({
          type: 'error',
          message: 'Något gick fel. Produkten har inte lagts till i varukorgen.',
        });
      });
  }
  return [handleBuy];
}