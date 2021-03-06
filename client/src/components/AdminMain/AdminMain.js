import React from 'react';
import { CategoriesList } from '../Lists/Admin/CategoriesList';
import { OrdersList } from '../Lists/Admin/OrdersList';
import { ProductsList } from '../Lists/Admin/ProductsList';

export const AdminMain = ({ categoryObject: { category } }) => (
  <div>
    {
        {
          Orders: <OrdersList />,
          Categories: <CategoriesList />,
          Products: <ProductsList />,
          default: '',
        }[category]
      }
  </div>
);
