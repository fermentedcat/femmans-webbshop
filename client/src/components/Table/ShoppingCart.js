import React, { useContext, useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { deleteFromCart, emptyCart, getCart, updateCart } from '../../api/api';
import { UiContext } from '../../context/uiContext';
import { SectionHeaderRow } from './styled/SectionHeaderRow';
import { TitleHeader } from './styled/TitleHeader';
import { StyledButton } from '../Buttons/StyledButton';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box
} from '@mui/material';

export const ShoppingCart = () => {
  const [amount, setAmount] = useState();
  const { data } = useFetch(getCart, amount);
  const { setNotification } = useContext(UiContext);

  const handleChangeQty = (e) => {
    e.preventDefault();

    let newAmount = e.target.value;
    const productId = e.target.name;
    if (parseInt(newAmount) > 0) {
      const updateAmount = { amount: newAmount }
      updateCart(updateAmount, productId)
      setNotification({
        type: 'success',
        message: 'Ändringen har sparats!',
      });
      setAmount(newAmount);
    } else {
      newAmount++;
      deleteFromCart(productId)
      setNotification({
        type: 'success',
        message: 'Ändringen har sparats!',
      });
      setAmount(0);
    }
  };

  let orderTotal;
  if (data) {
    orderTotal = data.cart
      .map((item) => item.product.price * item.amount)
      .reduce((sum, i) => sum + i, 0);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <SectionHeaderRow >
              <TableCell align="left">Produkt</TableCell>
              <TableCell ></TableCell>
              <TableCell align="center">Antal</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell ></TableCell>
            </SectionHeaderRow>
          </TableHead>

          <TableBody>
            {data &&
              data.cart.map((item) => {
                return (
                  <TableRow>
                    <TableCell>
                      {item.product ? <img src={item.product.photos[0]} alt='Product' style={{ 'width': '10ch' }} /> : ''}
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
                      <button style={{ background: '#cf4545', color: 'black', padding: '3px 7px', borderRadius: '10%', cursor: 'pointer' }} onClick={() => deleteFromCart(item.product._id)}>x</button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {data && (
              <TableRow>
                <TitleHeader colSpan="3" align='right'>Summa:</TitleHeader>
                <TableCell >{orderTotal}kr</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
        <StyledButton sx={{ bgcolor: 'gray' }} onClick={emptyCart}>Töm Varukorg</StyledButton>
        <StyledButton sx={{ bgcolor: 'green' }} href={'/checkout'}>Gå till kassan</StyledButton>
      </Box>
    </>
  );
};
