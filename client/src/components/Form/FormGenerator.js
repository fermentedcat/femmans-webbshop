import React from 'react'
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(() => ({
  button: {
    display: 'block',
    marginLeft: '.3em'
  }
}));

export const FormGenerator = ({inputs, onSubmit = null, button, children}) => {

  const inputFields = inputs.map((input, index) => {
    return (
      <TextField
        key={index}
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={input.label}
        required={input.required}
      />
    );
  });

  return (
    <>
      <StyledBox
        onSubmit={onSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        {inputFields}
        {button ? button : null}
      </StyledBox>
      {/* for rendering ex buttons outside the form */}
      {children}
    </>
  )
}
