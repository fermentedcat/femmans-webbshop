import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(() => ({
  color: '#F9F9F9',
  backgroundColor: '#C6BEBE',
  margin: '.5em',
  '&:hover': {
    backgroundColor: '#686364',
  },
  '&:disabled': {
    backgroundColor: '#EBE8E8',
  },
}));
