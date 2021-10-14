import React from 'react';
import useApi from '../../../hooks/useApi';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {
    data: orders, 
    error, 
    callGet: refresh, 
    setData: setOrders
  } = useApi('orders');

  
  const removeListItem = (id) => {
    setOrders(orders.filter(item => item._id !== id))
  }

  return (
    <List dense>
      {error && <p>Endast Admin har tillgång</p>}
      {orders &&
        orders.map((order) => {
          return (
            <OrderListItem
              key={order._id}
              order={order}
              removeListItem={removeListItem}
              refresh={refresh}
            />
          );
        })}
    </List>
  );
};
