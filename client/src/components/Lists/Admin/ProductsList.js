import React, { useState } from 'react';
import List from '@mui/material/List';
import { Modal, Button, Box } from '@mui/material';
import { getProducts, getCategories } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import { ProductForm } from '../../Form/ProductForm';
import { ProductListItem } from './ProductListItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '80vh',
};

export const ProductsList = () => {
  const [open, setOpen] = useState(false);

  const { data: products, setData: setProducts, error } = useFetch(getProducts);
  const { data: categories } = useFetch(getCategories);

  const removeListItem = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  const updateListItem = (newProduct) => {
    setProducts(products.map((product) => (product._id === newProduct._id ? newProduct : product)));
  };

  const addToList = (product) => {
    setProducts([product, ...products]);
  };

  return (
    <>
      {categories && <Button onClick={() => setOpen(!open)}> Add product </Button>}
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Box sx={style}>
          <ProductForm updateList={updateListItem} addToList={addToList} categories={categories} onExit={() => setOpen(false)} />
        </Box>
      </Modal>
      <List dense>
        {products && categories && (
          products.map((product) => (
            <ProductListItem
              categories={categories}
              key={product._id}
              product={product}
              removeListItem={removeListItem}
              updateListItem={updateListItem}
            />
          ))
        )}
        {(!products || !categories) && error ? <div>Can&apos;t get data</div> : <div>...Loading</div>}
      </List>
    </>
  );
};
