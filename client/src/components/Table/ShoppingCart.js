import React, { useContext, useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import {
  deleteFromCart, emptyCart, getCart, updateCart,
} from '../../api/api';
import { UiContext } from '../../context/uiContext';
import { SectionHeaderRow } from './styled/SectionHeaderRow';
import { TitleHeader } from './styled/TitleHeader';
import { StyledButton } from '../Buttons/StyledButton';

export const ShoppingCart = () => {
  const [triggerChange, setTriggerChange] = useState(true);
  const { data } = useFetch(getCart, triggerChange);
  const { setNotification, cartSet } = useContext(UiContext);

  const handleDeleteItem = (item) => {
    deleteFromCart(item.product._id);
    setTriggerChange(!triggerChange);
  };

  const handleEmptyCart = () => {
    emptyCart();
    setTriggerChange(!triggerChange);
  };

  const handleChangeQty = async (e) => {
    e.preventDefault();

    const newAmount = e.target.value;
    const productId = e.target.name;

    if (parseInt(newAmount, 10) > 0) {
      const updateAmount = { amount: newAmount };
      await updateCart(updateAmount, productId);
      setNotification({
        type: 'success',
        message: 'Ändringen har sparats!',
      });
      setTriggerChange(!triggerChange);
    } else if (parseInt(newAmount, 10) === 0) {
      await deleteFromCart(productId);
      setNotification({
        type: 'success',
        message: 'Produkt är borttagen!',
      });
      setTriggerChange(!triggerChange);
    } else {
      setNotification({
        type: 'warning',
        message: 'Måste vara en siffra',
      });
    }
  };

  let orderTotal;
  if (data) {
    orderTotal = data.cart
      .map((item) => item.product.price * item.amount)
      .reduce((sum, i) => sum + i, 0);
  }

  useEffect(() => {
    if (data) cartSet(data.cart);
  }, [data, cartSet]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <SectionHeaderRow>
              <TableCell align="left">Produkt</TableCell>
              <TableCell />
              <TableCell align="center">Antal</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell />
            </SectionHeaderRow>
          </TableHead>

          <TableBody>
            {data
              && data.cart.map((item) => (
                <TableRow key={item.product._id}>
                  <TableCell>
                    {item.product ? <img src={item.product.photos[0]} alt="Product" style={{ width: '10ch' }} /> : ''}
                  </TableCell>
                  <TitleHeader>
                    {item.product ? item.product.title : 'Produkten saknas'}
                  </TitleHeader>
                  <TableCell>
                    {item.product ? (
                      <TextField
                        type="number"
                        min={0}
                        name={item.product._id}
                        defaultValue={item.amount}
                        onChange={handleChangeQty}
                        sx={{ width: '12ch' }}
                      />
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {item.product ? `${item.product.price * item.amount}kr` : ''}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      style={{
                        background: '#cf4545', color: 'black', padding: '3px 7px', borderRadius: '10%', cursor: 'pointer',
                      }}
                      onClick={() => handleDeleteItem(item)}
                    >
                      x
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

            {data && (
              <TableRow>
                <TitleHeader colSpan="3" align="right">Summa:</TitleHeader>
                <TableCell>
                  {orderTotal}
                  kr
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component="div"
        sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px',
        }}
      >
        <StyledButton sx={{ bgcolor: 'gray' }} onClick={handleEmptyCart}>Töm Varukorg</StyledButton>
        <StyledButton sx={{ bgcolor: 'green' }} href="/checkout">Gå till kassan</StyledButton>
      </Box>
    </>
  );
};
