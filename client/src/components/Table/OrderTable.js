import React, { useState } from 'react';
import { updateOrder } from '../../api/api';

import { styled } from '@mui/material/styles';
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

const StyledSectionHeaderRow = styled(TableRow)(() => ({
  background: '#292828',
  th: {
    color: 'white',
    fontWeight: 700,
  },
}));

const StyledTitleHeader = styled(TableCell)(() => ({
  fontWeight: 700,
}));

export const OrderTable = ({ order, updateListItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderRowData, setOrderRowData] = useState(order.orderRows);

  const toggleEditRows = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateRowQty = async () => {
    const data = { orderRows: orderRowData };
    try {
      const newOrder = updateOrder('token', data, order._id)
      updateListItem(newOrder)
    } catch (error) {
      console.log(error)
    }
    finally{
      toggleEditRows();
    }
    
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const rowId = e.target.name;
    try {
      // check input and save to state
      const newAmount = parseInt(value);
      setOrderRowData((prevState) => {
        const index = prevState.findIndex((row) => row._id === rowId);
        const updated = [].concat(prevState);
        updated[index].amount = newAmount;
        return updated;
      });
    } catch {
      console.log('Ej numeriskt värde.');
    }
  };

  const orderRows = Object.values(order.orderRows).map((row) => {
    return (
      <TableRow key={row._id}>
        <TableCell>{row.product ? row.product.title : ""}</TableCell>
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

  const orderTotal = orderRowData
    .map((item) => item.priceEach * item.amount)
    .reduce((sum, i) => sum + i, 0);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <StyledSectionHeaderRow>
              <TableCell align="left" colSpan="3">
                Kundinfo
              </TableCell>
            </StyledSectionHeaderRow>
            <TableRow>
              <StyledTitleHeader>Namn</StyledTitleHeader>
              <StyledTitleHeader>ID</StyledTitleHeader>
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
            <StyledSectionHeaderRow>
              <TableCell align="left" colSpan="4">
                Leveransinfo
              </TableCell>
            </StyledSectionHeaderRow>
            <TableRow>
              <StyledTitleHeader>Gatuadress</StyledTitleHeader>
              <StyledTitleHeader>Postnummer</StyledTitleHeader>
              <StyledTitleHeader>Postort</StyledTitleHeader>
              <StyledTitleHeader>Land</StyledTitleHeader>
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
            <StyledSectionHeaderRow>
              <TableCell align="left" colSpan="4">
                Beställning
              </TableCell>
            </StyledSectionHeaderRow>
            <TableRow>
              <StyledTitleHeader>Produkt</StyledTitleHeader>
              <StyledTitleHeader>Antal</StyledTitleHeader>
              <StyledTitleHeader>Styckpris</StyledTitleHeader>
              <StyledTitleHeader>Total</StyledTitleHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRows}
            <TableRow>
              <StyledTitleHeader align="left" colSpan="3">Summa:</StyledTitleHeader>
              <StyledTitleHeader>{orderTotal}:-</StyledTitleHeader>
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
