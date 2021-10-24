import React from 'react'
import { Box, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(() => ({
  button: {
    display: 'block',
    marginLeft: '.3em'
  }
}));

export const FormGenerator = ({inputs, onSubmit = null, button, children}) => {

  const inputFields = inputs.map((input, index) => {
    if (input.type === 'select') {
      return (
        <FormControl key={index}>
          <InputLabel id="select-label">Kategori</InputLabel>
          <Select labelId="select-label" label="Kategori" value={input.categoryId} onChange={input.onChange}>
            {input.options.map((category, index) => {
              return <MenuItem key={index} value={category._id}>{category.title}</MenuItem>
            })}
          </Select>
        </FormControl>
      )
    }
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
          '& .MuiFormControl-root': { m: 1, width: '25ch' },
        }}
      >
        {inputFields}
        {button ? button : null}
      </StyledBox>
      {children}
    </>
  )
}
