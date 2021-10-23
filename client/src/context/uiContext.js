import React, { createContext, useReducer } from 'react';

const initialState = {
  modal: {
    show: false,
    type: ''
  },
  notification: {
    show: false,
    type: '',
    message: '',
  },
  cartQty: 0
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
          message: action.data.message
        }
      };
    }
    case 'NOTIFICATION_RESET': {
      return { 
        ...state, 
        notification: initialState.notification
      };
    }
    case 'MODAL_TOGGLE': {
      return { 
        ...state, 
        modal: {
          ...state.modal,
          show: !state.modal.show
        }
      };
    }
    case 'MODAL_OPEN': {
      return {
        ...state, 
        modal: {
          type: action.modalType,
          show: true
        }
      };
    }
    case 'MODAL_CLOSE': {
      return {
        ...state, 
        modal: {
          ...state.modal,
          show: false,
        }
      };
    }
    case 'MODAL_TYPE': {
      return {
        ...state, 
        modal: {
          ...state.modal,
          type: action.modalType,
        }
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
        cartQty: state.cartQty - action.qty
      };
    }
    case 'CART_CLEAR': {
      return {
        ...state, 
        cartQty: 0
      };
    }

    default: return state;
  }
}

export const UiProvider = ({ children}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setNotification = (data) => {
    dispatch({ type: 'NOTIFICATION', data })
  }

  const resetNotification = () => {
    dispatch({ type: 'NOTIFICATION_RESET' })
  }

  const toggleModal = () => {
    dispatch({ type: 'MODAL_TOGGLE' })
  }

  const openModal = (e) => {
    const modalType = e.target.name || ""
    dispatch({ type: 'MODAL_OPEN', modalType })
  }

  const closeModal = () => {
    dispatch({ type: 'MODAL_CLOSE' })
  }

  const setModalType = (modalType) => {
    dispatch({ type: 'MODAL_TYPE', modalType })
  }

  const cartAdd = () => {
    dispatch({ type: 'CART_ADD' })
  }

  const cartRemove = (qty = 1) => {
    dispatch({ type: 'CART_ADD', qty })
  }

  const cartClear = () => {
    dispatch({ type: 'CART_CLEAR' })
  }

  const ui = {
    modal: state.modal,
    notification: state.notification,
    cartQty: state.cartQty,
    setNotification,
    resetNotification,
    toggleModal,
    openModal,
    closeModal,
    setModalType,
    cartAdd,
    cartRemove,
    cartClear,
  }

  return (
    <UiContext.Provider value={ui}>
      {children}
    </UiContext.Provider>
  )

}