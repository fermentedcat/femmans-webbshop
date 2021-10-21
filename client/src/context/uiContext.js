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

    default: return state;
  }
}

export const UiProvider = ({ children}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setNotification = (data) => {
    console.log("login")
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

  const ui = {
    modal: state.modal,
    notification: state.notification,
    setNotification,
    resetNotification,
    toggleModal,
    openModal,
    closeModal,
    setModalType,
  }

  return (
    <UiContext.Provider value={ui}>
      {children}
    </UiContext.Provider>
  )

}