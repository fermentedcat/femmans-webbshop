import React from 'react';
import { getProducts } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';
import {ProductForm} from "../../Form/ProductForm";
import {ProductListItem} from "./ProductListItem";

export const ProductsList = () => {

  const {data: products, setData: setProducts, error} = useFetch(getProducts);
  
  const removeListItem = (id) => {
    setProducts(products.filter(product => product._id !== id))
  }

  const updateListItem = (newProduct) => {
    setProducts(products.map(product => product._id === newProduct._id ? newProduct : product))
  }

  const addToList = (product) => {
    setProducts([product, ...products])
  }

  return (
    <>
    <ProductForm updateList={updateListItem} addToList={addToList}/>
    <List dense>
      {error && <p>Kan inte hämta data</p>}
      {products &&
        products.map((product) => {
          return (
            <ProductListItem
              key={product._id}
              product={product}
              removeListItem={removeListItem}
              updateListItem={updateListItem}
            />
          );
        })}
    </List>
    </>
  );
};
