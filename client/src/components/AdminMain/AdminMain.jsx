import React from 'react'
import { CategoriesList } from '../Lists/Admin/CategoriesList'
import { OrdersList } from '../Lists/Admin/OrdersList'
import { ProductsList } from '../Lists/Admin/ProductsList'

export const AdminMain = ({ categoryObject: { category, endpoint } }) => {
  return (
    <div>
      {
        {
          Orders: <OrdersList endpoint={endpoint} />,
          Categories: <CategoriesList endpoint={endpoint} />,
          Products: <ProductsList endpoint={endpoint} />,
          default: "<Default />"
        }[category]
      }
    </div>
  )
}