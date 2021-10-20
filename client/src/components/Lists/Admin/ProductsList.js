import React, { useState } from 'react'
import { getProducts } from '../../../api/api'
import List from '@mui/material/List';
import { OrderListItem } from './OrderListItem';
import { useFetch } from '../../../hooks/useFetch';
import { Button } from '@mui/material';
import { BasicModal } from '../../Layout/BasicModal';
import { ProductForm } from '../../Form/ProductForm';

export const ProductsList = () => {
  const {data: products, setData: setProducts, error} = useFetch(getProducts);
  const [showModal, setShowModal] = useState(false)

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  const removeListItem = (id) => {
    setProducts(products.filter(item => item._id !== id))
  }

  const updateListItem = (newItem) => {
    setProducts(products.map(item => item._id === newItem.id ? newItem : item))
  }

  const addListItem = (newItem) => {
    setProducts([...products, newItem])
  }

  return (
    <List dense>
      {error && <p>Endast Admin har tillgång</p>}
      {!error && (
        <Button onClick={toggleShowModal}>Lägg till produkt</Button>
      )}
      {products &&
        products.map((product) => {
          return (
            //TODO: egen komponent?
            <OrderListItem
              key={product._id}
              order={product}
              removeListItem={removeListItem}
              updateListItem={updateListItem}
            />
          );
        })}
        <BasicModal
          minHeight="70vh"
          open={showModal}
          onClose={toggleShowModal}
          title='Lägg till produkt'
        >
          <ProductForm exitForm={toggleShowModal} updateList={addListItem}/>
        </BasicModal>
    </List>
  )
}
