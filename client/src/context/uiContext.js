import React, { createContext, useCallback, useReducer } from 'react';
import { getCart } from '../api/api'

const initialState = {
  modal: {
    show: false,
    type: '',
  },
  notification: {
    show: false,
    type: '',
    message: '',
  },
  cartQty: 0,
};

const UiContext = createContext(initialState);
export { UiContext };

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return {
        ...state,
        notification: {
          show: true,
          type: action.data.type,
          message: action.data.message,
        },
      };
    }
    case 'NOTIFICATION_CLOSE': {
      return {
        ...state,
        notification: {
          ...state.notification,
          show: false
        },
      };
    }
    case 'NOTIFICATION_RESET': {
      return {
        ...state,
        notification: initialState.notification,
      };
    }
    case 'MODAL_TOGGLE': {
      return {
        ...state,
        modal: {
          ...state.modal,
          show: !state.modal.show,
        },
      };
    }
    case 'MODAL_OPEN': {
      return {
        ...state,
        modal: {
          type: action.modalType,
          show: true,
        },
      };
    }
    case 'MODAL_CLOSE': {
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false,
        },
      };
    }
    case 'CART_SET': {
      return {
        ...state,
        cartQty: action.qty,
      };
    }
    case 'CART_ADD': {
      return {
        ...state,
        cartQty: state.cartQty + 1
      };
    }
    case 'CART_REMOVE': {
      return {
        ...state,
        cartQty: state.cartQty - action.qty,
      };
    }
    case 'CART_CLEAR': {
      return {
        ...state,
        cartQty: 0,
      };
    }

    default:
      return state;
  }
};

export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setNotification = (data) => {
    dispatch({ type: 'NOTIFICATION', data });
  };

  const closeNotification = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'NOTIFICATION_CLOSE' });
  };

  const resetNotification = () => {
    dispatch({ type: 'NOTIFICATION_RESET' });
  };

  const toggleModal = () => {
    dispatch({ type: 'MODAL_TOGGLE' });
  };

  const openModal = (e) => {
    const modalType = e.target.name || '';
    dispatch({ type: 'MODAL_OPEN', modalType });
  };
  
  const openModalType = (modalType) => {
    dispatch({ type: 'MODAL_OPEN', modalType });
  };

  const closeModal = () => {
    dispatch({ type: 'MODAL_CLOSE' });
  };

  const cartFetch = useCallback( async () => {
    try {
      const response = await getCart();
      const qty = response.data.cart.length;
      dispatch({ type: 'CART_SET', qty })
    } catch (error) {
      setNotification({ type: 'error', message: 'Kunde inte hämta kundkorgen.'});
    }
  }, [])

  const cartAdd = () => {
    dispatch({ type: 'CART_ADD' });
  };

  const cartRemove = (qty = 1) => {
    dispatch({ type: 'CART_REMOVE', qty });
  };

  const cartClear = () => {
    dispatch({ type: 'CART_CLEAR' });
  };

  const ui = {
    modal: state.modal,
    notification: state.notification,
    cartQty: state.cartQty,
    setNotification,
    closeNotification,
    resetNotification,
    toggleModal,
    openModal,
    openModalType,
    closeModal,
    cartFetch,
    cartAdd,
    cartRemove,
    cartClear,
  };

  return <UiContext.Provider value={ui}>{children}</UiContext.Provider>;
};
