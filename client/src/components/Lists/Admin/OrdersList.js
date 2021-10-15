import React from 'react';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {data: orders, setData: setOrders, error} = useFetch(getOrders);

  const removeListItem = (id) => {
    setOrders(orders.filter(item => item._id !== id))
  }

  const updateListItem = (newItem) => {
    setOrders(orders.map(item => item._id === newItem.id ? newItem : item))
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
              updateListItem={updateListItem}
            />
          );
        })}
    </List>
  );
};
