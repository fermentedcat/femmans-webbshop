import React, { useContext, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import { getOrdersByUser, getLoggedInUser } from '../api/api';
import { OrderTable } from '../components/Table/OrderTable';
import { SectionHeaderRow } from '../components/Table/styled/SectionHeaderRow';
import { TitleHeader } from '../components/Table/styled/TitleHeader';
import { UiContext } from '../context/uiContext';


export const ProfilePage = () => {
  const { data: user } = useFetch(getLoggedInUser)
  const { data: orders } = useFetch(getOrdersByUser)
  const [viewOrder, setViewOrder] = useState(null)
  const { openModalType } = useContext(UiContext)

  const toggleViewOrder = (order) => {
    if (!viewOrder) {
      setViewOrder(order);
      return;
    }
    if (viewOrder._id === order._id) {
      setViewOrder(null);
      return;
    }
    setViewOrder(order);
  }

  const handleProfileEdit = () => {
    openModalType('edit_profile', user)
  }

  return (
    <Box>
      <Typography variant='h3'>Din profil</Typography>

      {user && (
        <Box sx={{ my: 3 }}>
          <Typography variant='h6'>Namn: {user.fullName}</Typography>
          <Typography variant='h6'>Användarnamn: {user.displayName}</Typography>
          <Typography variant='h6'>Email: {user.email}</Typography>
          <Button onClick={handleProfileEdit}>Redigera profil</Button>
        </Box>
      )}
      <Table aria-label="spanning table">
        <TableHead>
          <SectionHeaderRow>
            <TableCell align="left" colSpan="5">
              Orderhistorik
            </TableCell>
          </SectionHeaderRow>
          <TableRow>
              <TitleHeader>Datum</TitleHeader>
              <TitleHeader>OrderId</TitleHeader>
              <TitleHeader>Status</TitleHeader>
              <TitleHeader colSpan="2">Total</TitleHeader>
            </TableRow>
        </TableHead>
        {/*  */}
        {orders && (
          orders.map((order => {
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', 'DD-MM-YY')
            let orderStatus = ''
            let btnText = 'Läs mer'
            if (viewOrder) {
              if (viewOrder._id === order._id) btnText = 'Stäng'
            }
            switch (order.status) {
              case 'Registered': {
                orderStatus = 'Registrerad'
                break;
              }
              case 'Processing': {
                orderStatus = 'Behandlas'
                break;
              }
              case 'Shipped': {
                orderStatus = 'Under leverans'
                break;
              }
              case 'Delivered': {
                orderStatus = 'Levererad'
                break;
              }
              default: break;
            }
            return (
                <TableBody key={order._id}>
                  <TableRow>
                    <TableCell>{orderDate}</TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{orderStatus}</TableCell>
                    <TableCell>{order.orderRows.reduce((prev, curr) => prev + curr.priceEach * curr.amount, 0)}:-</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', cursor: 'pointer' , '&:hover': { backgroundColor: '#C6BEBE'}}} align="center" onClick={() => toggleViewOrder(order)}>
                      {btnText}
                    </TableCell>
                  </TableRow>
                </TableBody>
                
            )
          }))
        )}
      </Table>
      {viewOrder && (
        <Box sx={{ marginTop: 5 }}>
          <OrderTable key={viewOrder._id} readOnly order={viewOrder}/>
        </Box>
      )}
    </Box>
  )
}
