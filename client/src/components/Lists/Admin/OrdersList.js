import React from 'react';
import { useEffect } from 'react';
import { getOrders } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';

import { OrderListItem } from './OrderListItem';

export const OrdersList = () => {
  const {data: orders, setData: setOrders, /* error, */ run: runGetOrders} = useFetch(getOrders);
  
  useEffect(() => {
    runGetOrders();
    console.log('Hejsan Alla glada!');
  }, []);

  const updateOrderList = () => {

  }

  return (
    <List dense>
      {orders &&
        orders.map((order, index) => {
          return (
            <OrderListItem
              key={index}
              order={order}
              afterUpdate={runGetOrders}
              setOrders={setOrders}
            />
          );
        })}
    </List>
  );
};
