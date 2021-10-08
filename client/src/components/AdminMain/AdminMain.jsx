import React from 'react'

export const AdminMain = ({ categoryObject: { category, endpoint } }) => {
  return (
    <div>
      {
        {
          categories: <OrdersList endpoint={endpoint} />,
          orders: <CategoriesList endpoint={endpoint} />,
          products: <ProductsList endpoint={endpoint} />,
          users: <UsersList endpoint={endpoint} />,
          default: <Default />
        }[category]
      }
    </div>
  )
}
