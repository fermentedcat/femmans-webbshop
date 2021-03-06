import React from 'react';
import List from '@mui/material/List';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const { data: orders, setData: setOrders } = useFetch(getOrders);

  const removeListItem = (id) => {
    setOrders(orders.filter((item) => item._id !== id));
  };

  const updateListItem = (newItem) => {
    setOrders(orders.map((item) => (item._id === newItem._id ? newItem : item)));
  };

  return (
    <List dense>
      {orders
        && orders.map((order) => (
          <OrderListItem
            key={order._id}
            order={order}
            removeListItem={removeListItem}
            updateListItem={updateListItem}
          />
        ))}
    </List>
  );
};
