import React from 'react'
import { CategoriesList } from '../Lists/Admin/CategoriesList'
import { OrdersList } from '../Lists/Admin/OrdersList'
import { ProductsList } from '../Lists/Admin/ProductsList'
import { UsersList } from '../Lists/Admin/UsersList'

export const AdminMain = ({ categoryObject: { category, endpoint } }) => {
  return (
    <div>
      {
        {
          Orders: <OrdersList endpoint={endpoint} />,
          Categories: <CategoriesList endpoint={endpoint} />,
          Products: <ProductsList endpoint={endpoint} />,
          Users: <UsersList endpoint={endpoint} />,
          default: "<Default />"
        }[category]
      }
    </div>
  )
}