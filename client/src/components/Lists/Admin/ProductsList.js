import React from 'react';
import { getProducts, getCategories } from '../../../api/api';
import { useFetch } from '../../../hooks/useFetch';
import List from '@mui/material/List';
import {ProductForm} from "../../Form/ProductForm";
import {ProductListItem} from "./ProductListItem";

export const ProductsList = () => {

  const {data: products, setData: setProducts, error} = useFetch(getProducts);
  const {data: categories, error: categoryError} = useFetch(getCategories)
  
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
    {categories && <ProductForm updateList={updateListItem} addToList={addToList} categories={categories}/>}
    <List dense>
      {products && categories ? (
       products.map(product => {
          return (
            <ProductListItem
              categories={categories}
              key={product._id}
              product={product}
              removeListItem={removeListItem}
              updateListItem={updateListItem}
            />
          );
        })
      ): error ? <div>Can't get data</div> : <div>...Loading</div>}
    </List>
    </>
  );
};
