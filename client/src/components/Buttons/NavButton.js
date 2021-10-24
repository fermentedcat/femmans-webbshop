import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const NavButton = styled(Button)(() => ({
    backgroundColor: 'none',
    margin: 0,
    height: '100%',
    borderRadius: 0,
    color: '#F9F9F9',
    '&:hover': {
        backgroundColor: '#686364'
    },
    '&:active': {
        backgroundColor: '#C6BEBE'
    }
}));