import React, { useContext, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getCart } from '../../api/api';
import { UiContext } from '../../context/uiContext';
import { SectionHeaderRow } from './styled/SectionHeaderRow';
import { TitleHeader } from './styled/TitleHeader';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

export const ShoppingCart = () => {
  const { data } = useFetch(getCart);
  const [rowsInput, setRowsInput] = useState({});
  const { setNotification } = useContext(UiContext);
  

  const handleChangeQty = (e) => {
    const newQty = e.target.value;
    const productId = e.target.name;
    if (parseInt(newQty) >= 0) {
      setRowsInput({ ...rowsInput, [productId]: newQty });
      // Todo: decide - update instantly or on save (add button)
      setNotification({
        type: 'success',
        message: 'Ändringen har sparats!',
      });
    } else {
      e.target.value = 0;
      setNotification({
        type: 'error',
        message: 'Kunde inte spara dina ändringar.',
      });
    }
  };

  let orderTotal;
  if (data) {
    orderTotal = data.cart
      .map((item) => item.product.price * item.amount)
      .reduce((sum, i) => sum + i, 0);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <SectionHeaderRow>
            <TableCell align="left">Produkt</TableCell>
            <TableCell align="left">Styckpris</TableCell>
            <TableCell align="left">Antal</TableCell>
            <TableCell align="left">Total</TableCell>
          </SectionHeaderRow>
        </TableHead>

        <TableBody>
          {data &&
            data.cart.map((item) => {
              return (
                <TableRow>
                  <TitleHeader>
                    {item.product ? item.product.title : 'Produkten saknas'}
                  </TitleHeader>
                  <TableCell>
                    {item.product ? item.product.price : ''}
                  </TableCell>
                  <TableCell>
                    {item.product ? (
                      <TextField
                        type="number"
                        min={0}
                        name={item.product._id} //TODO: adjust to upcoming edit cart controller
                        defaultValue={item.amount}
                        onChange={handleChangeQty}
                        sx={{ width: '12ch' }}
                      />
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell>
                    {item.product ? item.product.price * item.amount : ''}
                  </TableCell>
                </TableRow>
              );
            })}

          {data && (
            <TableRow>
              <TitleHeader colSpan="3">Summa</TitleHeader>
              <TitleHeader>{orderTotal}</TitleHeader>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
