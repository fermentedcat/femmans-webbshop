import React from 'react';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {data: orders, setData: setOrders, error} = useFetch(getOrders, 'token');

  
  const removeListItem = (id) => {
    setOrders(orders.filter(item => item._id !== id))
  }

  const updateListItem = (newItem) => {
    setOrders(orders.map(item => item._id === newItem.id ? newItem : item))
  }

  return (
    <List dense>
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
