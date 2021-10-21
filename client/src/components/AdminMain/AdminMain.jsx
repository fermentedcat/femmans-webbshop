import React from 'react'
import { CategoriesList } from '../Lists/Admin/CategoriesList'
import { OrdersList } from '../Lists/Admin/OrdersList'
import { ProductsList } from '../Lists/Admin/ProductsList'

export const AdminMain = ({ categoryObject: { category } }) => {
  return (
    <div>
      {
        {
          Orders: <OrdersList />,
          Categories: <CategoriesList />,
          Products: <ProductsList />,
          default: "<Default />"
        }[category]
      }
    </div>
  )
}