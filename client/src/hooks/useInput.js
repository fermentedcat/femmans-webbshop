import { useReducer } from 'react';

const initialInputState = (initialValue) => {
  return {
    value: initialValue,
    isTouched: false,
  };
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return inputStateReducer;
};

const useInput = (
  validate = () => {
    return true;
  },
  initialValue = ''
) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState(initialValue)
  );

  const isValid = validate(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const onChange = (e) => {
    dispatch({ type: 'INPUT', value: e.target.value });
  };

  const onBlur = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid,
    hasError,
    onChange,
    onBlur,
    reset,
  };
};

export default useInput;
