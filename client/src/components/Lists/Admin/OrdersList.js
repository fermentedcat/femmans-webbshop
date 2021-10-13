import React from 'react';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {data: orders, /* error, */ updateData} = useFetch(getOrders);


  return (
    <List dense>
      {orders &&
        orders.map((order, index) => {
          return (
            <OrderListItem
              key={index}
              order={order}
              afterUpdate={updateData}
            />
          );
        })}
    </List>
  );
};
