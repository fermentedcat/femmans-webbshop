import React, { useEffect, useState } from 'react'
import { getAll } from '../../../api'
import List from '@mui/material/List'

import { OrderListItem } from './OrderListItem'

export const OrdersList = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders()
  }, []);

  const fetchOrders = () => {
    getAll('orders').then((data) => {
      setOrders(data);
    });
  };

  return (
    <List dense>
      {orders &&
        orders.map((order, index) => {
          return (
            <OrderListItem
              key={index}
              order={order}
              afterUpdate={fetchOrders}
            />
          )
        })}
    </List>
  )
}
