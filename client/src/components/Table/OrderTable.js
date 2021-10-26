import React, { useState } from 'react';
import { updateOrder } from '../../api/api';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from '@mui/material';

import { SectionHeaderRow } from './styled/SectionHeaderRow';
import { TitleHeader } from './styled/TitleHeader';

export const OrderTable = ({ order, updateListItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderRowData, setOrderRowData] = useState(order.orderRows);

  const toggleEditRows = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateRowQty = async () => {
    const data = { orderRows: orderRowData }
    try {
      const newOrder = await updateOrder(data, order._id)
      updateListItem(newOrder.data)
    } catch (error) {
      console.log(error);
    } finally {
      toggleEditRows();
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const rowId = e.target.name;
    try {
      const newAmount = parseInt(value);
      setOrderRowData(orderRowData.map(row => row._id === rowId ? {...row, amount: newAmount} : row))
    } catch {
      console.log('Ej numeriskt värde.');
    }
  };

  const orderRows = Object.values(orderRowData).map((row) => {
    return (
      <TableRow key={row._id}>
        <TableCell>{row.productTitle ?? ""}</TableCell>
        <TableCell>
          {!isEditing ? (
            row.amount
          ) : (
            <TextField
              type="number"
              name={row._id}
              defaultValue={row.amount}
              onChange={handleOnChange}
            />
          )}
        </TableCell>
        <TableCell>{row.priceEach}:-</TableCell>
        <TableCell>{row.priceEach * row.amount}:-</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <SectionHeaderRow>
              <TableCell align="left" colSpan="3">
                Kundinfo
              </TableCell>
            </SectionHeaderRow>
            <TableRow>
              <TitleHeader>Namn</TitleHeader>
              <TitleHeader>ID</TitleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{order.user.fullName}</TableCell>
              <TableCell>{order.user._id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table aria-label="spanning table">
          <TableHead>
            <SectionHeaderRow>
              <TableCell align="left" colSpan="4">
                Leveransinfo
              </TableCell>
            </SectionHeaderRow>
            <TableRow>
              <TitleHeader>Gatuadress</TitleHeader>
              <TitleHeader>Postnummer</TitleHeader>
              <TitleHeader>Postort</TitleHeader>
              <TitleHeader>Land</TitleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{order.address.street}</TableCell>
              <TableCell>{order.address.postalCode}</TableCell>
              <TableCell>{order.address.city}</TableCell>
              <TableCell>{order.address.country}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table aria-label="spanning table">
          <TableHead>
            <SectionHeaderRow>
              <TableCell align="left" colSpan="4">
                Beställning
              </TableCell>
            </SectionHeaderRow>
            <TableRow>
              <TitleHeader>Produkt</TitleHeader>
              <TitleHeader>Antal</TitleHeader>
              <TitleHeader>Styckpris</TitleHeader>
              <TitleHeader>Total</TitleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRows}
            <TableRow>
              <TitleHeader align="left" colSpan="3">Summa:</TitleHeader>
              <TitleHeader>{orderRowData.reduce((prev, curr) => prev + curr.priceEach * curr.amount, 0)}:-</TitleHeader>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={toggleEditRows}>
        {isEditing ? 'Sluta ändra' : 'Ändra order'}
      </Button>
      {isEditing && <Button onClick={handleUpdateRowQty}>Spara</Button>}
    </>
  );
};
