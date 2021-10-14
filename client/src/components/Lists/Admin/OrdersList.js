import React from 'react';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {data: orders, error} = useFetch(getOrders, 'token');

  return (
    <List dense>
      {orders &&
        orders.map((order) => {
          return (
            <OrderListItem
              key={index}
              order={order._id}
              afterUpdate={updateData}
            />
          );
        })}
    </List>
  );
};
